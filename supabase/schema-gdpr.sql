-- GDPR Compliance Schema Extensions
-- Adds tables for consent management, data requests, and audit trails

-- ============================================================================
-- USER CONSENTS TABLE (GDPR Article 7)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_consents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Consent types
  essential_consent BOOLEAN DEFAULT true NOT NULL, -- Required for service
  analytics_consent BOOLEAN DEFAULT false,
  marketing_consent BOOLEAN DEFAULT false,
  voice_recording_consent BOOLEAN DEFAULT false,
  
  -- Audit trail (GDPR Article 7.1 - demonstrate consent)
  consent_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  consent_version TEXT DEFAULT '1.0' NOT NULL, -- Track consent form version
  ip_address INET, -- For audit purposes
  user_agent TEXT, -- For audit purposes
  
  -- Withdrawal tracking
  withdrawn BOOLEAN DEFAULT false,
  withdrawn_at TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick lookups
CREATE INDEX idx_user_consents_user_id ON public.user_consents(user_id);
CREATE INDEX idx_user_consents_date ON public.user_consents(consent_date DESC);

-- RLS Policies
ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own consents" ON public.user_consents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own consents" ON public.user_consents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consents" ON public.user_consents
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================================
-- DATA DELETION REQUESTS (GDPR Article 17 - Right to Erasure)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.data_deletion_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Request details
  request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  reason TEXT,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'rejected')) DEFAULT 'pending',
  
  -- Processing details
  processed_by UUID REFERENCES auth.users(id), -- Admin who processed
  processed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  
  -- Retained data (for legal/professional reasons)
  retained_data JSONB DEFAULT '[]'::jsonb,
  retention_reason TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_deletion_requests_user ON public.data_deletion_requests(user_id);
CREATE INDEX idx_deletion_requests_status ON public.data_deletion_requests(status);

-- RLS Policies
ALTER TABLE public.data_deletion_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own deletion requests" ON public.data_deletion_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own deletion requests" ON public.data_deletion_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all requests (separate policy for admin role)
CREATE POLICY "Admins can manage deletion requests" ON public.data_deletion_requests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================================================
-- DATA ACCESS REQUESTS (GDPR Article 15 - Right to Access)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.data_access_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Request details
  request_date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
  
  -- Export details
  export_generated_at TIMESTAMP WITH TIME ZONE,
  export_url TEXT, -- Secure temporary download link
  export_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  file_size_bytes INTEGER,
  records_count JSONB, -- {"sessions": 10, "check_ins": 5, etc.}
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_access_requests_user ON public.data_access_requests(user_id);
CREATE INDEX idx_access_requests_status ON public.data_access_requests(status);

-- RLS Policies
ALTER TABLE public.data_access_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own access requests" ON public.data_access_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own access requests" ON public.data_access_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- SECURITY INCIDENTS (GDPR Article 33-34 - Breach Notification)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.security_incidents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Incident details
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) NOT NULL,
  detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  
  -- Affected data
  affected_users UUID[], -- Array of user IDs
  data_categories TEXT[], -- e.g., ["personal_info", "session_data"]
  estimated_affected_count INTEGER,
  
  -- Response tracking
  status TEXT CHECK (status IN ('investigating', 'contained', 'resolved', 'reported')) DEFAULT 'investigating',
  contained_at TIMESTAMP WITH TIME ZONE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  
  -- Notification tracking
  authority_notified BOOLEAN DEFAULT false, -- DPA (Data Protection Authority)
  authority_notified_at TIMESTAMP WITH TIME ZONE,
  users_notified BOOLEAN DEFAULT false,
  users_notified_at TIMESTAMP WITH TIME ZONE,
  
  -- Investigation
  root_cause TEXT,
  remediation_actions TEXT[],
  responsible_party TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_security_incidents_severity ON public.security_incidents(severity);
CREATE INDEX idx_security_incidents_status ON public.security_incidents(status);
CREATE INDEX idx_security_incidents_detected ON public.security_incidents(detected_at DESC);

-- RLS Policies (Admin only)
ALTER TABLE public.security_incidents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view incidents" ON public.security_incidents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can manage incidents" ON public.security_incidents
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- ============================================================================
-- AUDIT LOG (Track all data access and modifications)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Who
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  user_role TEXT,
  
  -- What
  action TEXT NOT NULL, -- 'create', 'read', 'update', 'delete', 'export', 'consent_change'
  table_name TEXT NOT NULL,
  record_id TEXT,
  
  -- Details
  old_values JSONB, -- Previous data
  new_values JSONB, -- New data
  
  -- When & Where
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  ip_address INET,
  user_agent TEXT,
  
  -- Context
  request_id TEXT, -- Track related actions
  notes TEXT
);

-- Indexes for audit queries
CREATE INDEX idx_audit_log_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_log_timestamp ON public.audit_log(timestamp DESC);
CREATE INDEX idx_audit_log_action ON public.audit_log(action);
CREATE INDEX idx_audit_log_table ON public.audit_log(table_name);

-- RLS Policies
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own audit log" ON public.audit_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all audit logs" ON public.audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- System can insert audit logs (handled by triggers)
CREATE POLICY "System can insert audit logs" ON public.audit_log
  FOR INSERT WITH CHECK (true);

-- ============================================================================
-- AUTOMATIC AUDIT TRIGGERS
-- ============================================================================

-- Function to create audit log entries
CREATE OR REPLACE FUNCTION public.create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values,
    timestamp
  ) VALUES (
    auth.uid(),
    TG_OP, -- INSERT, UPDATE, DELETE
    TG_TABLE_NAME,
    CASE 
      WHEN TG_OP = 'DELETE' THEN OLD.id::TEXT
      ELSE NEW.id::TEXT
    END,
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END,
    NOW()
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_profiles
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_audit_log();

CREATE TRIGGER audit_sessions
  AFTER INSERT OR UPDATE OR DELETE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION public.create_audit_log();

CREATE TRIGGER audit_check_ins
  AFTER INSERT OR UPDATE OR DELETE ON public.check_ins
  FOR EACH ROW EXECUTE FUNCTION public.create_audit_log();

CREATE TRIGGER audit_questionnaires
  AFTER INSERT OR UPDATE OR DELETE ON public.questionnaire_responses
  FOR EACH ROW EXECUTE FUNCTION public.create_audit_log();

-- ============================================================================
-- DATA RETENTION AUTOMATION
-- ============================================================================

-- Function to anonymize old data (runs via cron job)
CREATE OR REPLACE FUNCTION public.anonymize_old_data()
RETURNS void AS $$
BEGIN
  -- Anonymize users who requested deletion 30+ days ago
  UPDATE public.profiles
  SET 
    email = 'deleted_' || id || '@anonymized.local',
    name = 'Deleted User',
    updated_at = NOW()
  WHERE id IN (
    SELECT user_id FROM public.data_deletion_requests
    WHERE status = 'completed'
    AND processed_at < NOW() - INTERVAL '30 days'
  );
  
  -- Delete analytics data older than 26 months (GDPR recommendation)
  -- Add your analytics tables here
  
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GDPR COMPLIANCE VIEWS (Helpful for reporting)
-- ============================================================================

-- View for consent summary
CREATE OR REPLACE VIEW public.consent_summary AS
SELECT 
  uc.user_id,
  p.email,
  p.name,
  uc.essential_consent,
  uc.analytics_consent,
  uc.marketing_consent,
  uc.voice_recording_consent,
  uc.consent_date,
  uc.withdrawn
FROM public.user_consents uc
JOIN public.profiles p ON p.id = uc.user_id
WHERE NOT uc.withdrawn
ORDER BY uc.consent_date DESC;

-- View for data subject rights requests
CREATE OR REPLACE VIEW public.data_rights_requests AS
SELECT 
  'deletion' as request_type,
  dr.id,
  dr.user_id,
  p.email,
  dr.request_date,
  dr.status,
  dr.processed_at
FROM public.data_deletion_requests dr
JOIN public.profiles p ON p.id = dr.user_id
UNION ALL
SELECT 
  'access' as request_type,
  da.id,
  da.user_id,
  p.email,
  da.request_date,
  da.status,
  da.export_generated_at as processed_at
FROM public.data_access_requests da
JOIN public.profiles p ON p.id = da.user_id
ORDER BY request_date DESC;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT SELECT ON public.consent_summary TO authenticated;
GRANT SELECT ON public.data_rights_requests TO authenticated;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.user_consents IS 'GDPR Article 7 - Records of user consent for data processing';
COMMENT ON TABLE public.data_deletion_requests IS 'GDPR Article 17 - Right to erasure (right to be forgotten)';
COMMENT ON TABLE public.data_access_requests IS 'GDPR Article 15 - Right of access (data portability)';
COMMENT ON TABLE public.security_incidents IS 'GDPR Article 33-34 - Personal data breach notification';
COMMENT ON TABLE public.audit_log IS 'GDPR Article 30 - Records of processing activities';

COMMENT ON COLUMN public.user_consents.consent_version IS 'Tracks version of consent form to comply with GDPR Article 7.1';
COMMENT ON COLUMN public.audit_log.ip_address IS 'Stored for security purposes (GDPR Article 6.1.f - legitimate interest)';

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert default consent for existing users (they need to re-confirm)
INSERT INTO public.user_consents (user_id, essential_consent, analytics_consent, marketing_consent, voice_recording_consent)
SELECT id, true, false, false, false
FROM public.profiles
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_consents WHERE user_id = profiles.id
);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'GDPR compliance schema installed successfully!';
  RAISE NOTICE 'Tables created: user_consents, data_deletion_requests, data_access_requests, security_incidents, audit_log';
  RAISE NOTICE 'All tables have RLS enabled';
  RAISE NOTICE 'Audit triggers active on: profiles, sessions, check_ins, questionnaire_responses';
END $$;

