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
    image: '/images/coaches/coach-female-1.jpg',
    bio: 'ICF-certifierad coach med 15 års erfarenhet av ledarutveckling',
    specialties: ['Ledarskap', 'Teamutveckling', 'Kommunikation']
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Leadership Coach',
    image: '/images/coaches/coach-male-1.jpg',
    bio: 'Specialist på att utveckla nya chefer och team leaders',
    specialties: ['Karriärutveckling', 'Konflikthantering', 'Motivation']
  },
  {
    id: '3',
    name: 'Emma Johansson',
    title: 'Executive Leadership Coach',
    image: '/images/coaches/coach-female-2.jpg',
    bio: 'Erfaren coach för VD:ar och ledningsgrupper',
    specialties: ['Strategiskt ledarskap', 'Förändringsledning', 'Kulturfrågor']
  },
  {
    id: '4',
    name: 'David Thompson',
    title: 'Senior Leadership Consultant',
    image: '/images/coaches/coach-male-2.jpg',
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

