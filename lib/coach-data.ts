// Coach profiles with placeholder images
// TODO: Replace with DALL-E generated images when API key is available

export interface Coach {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
}

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Sarah Martinez',
    title: 'Senior Executive Coach',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=faces',
    bio: 'ICF-certifierad coach med 15 års erfarenhet av ledarutveckling',
    specialties: ['Ledarskap', 'Teamutveckling', 'Kommunikation']
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Leadership Coach',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=faces',
    bio: 'Specialist på att utveckla nya chefer och team leaders',
    specialties: ['Karriärutveckling', 'Konflikthantering', 'Motivation']
  },
  {
    id: '3',
    name: 'Emma Johansson',
    title: 'Executive Leadership Coach',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=faces',
    bio: 'Erfaren coach för VD:ar och ledningsgrupper',
    specialties: ['Strategiskt ledarskap', 'Förändringsledning', 'Kulturfrågor']
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Senior Leadership Consultant',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=faces',
    bio: 'Över 20 års erfarenhet av ledarutveckling i globala företag',
    specialties: ['Global ledarskap', 'Organisationsutveckling', 'Mentorskap']
  }
];

export function getCoachById(id: string): Coach | undefined {
  return coaches.find(coach => coach.id === id);
}

export function getRandomCoach(): Coach {
  return coaches[Math.floor(Math.random() * coaches.length)];
}

