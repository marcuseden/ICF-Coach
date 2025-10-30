// Swedish version of coach profiles

export interface CoachSV {
  id: string;
  name: string;
  title: string;
  image: string;
  bio: string;
  specialties: string[];
}

export const coachesSV: CoachSV[] = [
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

export function getCoachByIdSV(id: string): CoachSV | undefined {
  return coachesSV.find(coach => coach.id === id);
}

export function getRandomCoachSV(): CoachSV {
  return coachesSV[Math.floor(Math.random() * coachesSV.length)];
}

