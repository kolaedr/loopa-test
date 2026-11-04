import React from 'react';
import { useLanguage } from '../LanguageProvider';

interface TeamMember {
  name: string;
  role: string;
  biography: string;
}

const AboutTeam = () => {
  const { language } = useLanguage();

  const teamData = {
    en: [
      {
        name: 'Alice Johnson',
        role: 'Project Lead',
        biography: 'Alice is the project lead with over 10 years of experience in software development.'
      },
      {
        name: 'Bob Smith',
        role: 'Frontend Developer',
        biography: 'Bob specializes in React and Next.js development with a passion for creating user-friendly interfaces.'
      },
      {
        name: 'Carol Williams',
        role: 'Backend Developer',
        biography: 'Carol is a full-stack developer who enjoys architecture and scalable solutions.'
      },
      {
        name: 'David Brown',
        role: 'UX Designer',
        biography: 'David creates beautiful and intuitive designs that enhance user experience.'
      }
    ],
    uk: [
      {
        name: 'Аліса Джонсон',
        role: 'Керівниця проекту',
        biography: 'Аліса є керівницею проекту з понад 10-річним досвідом у розробці програмного забезпечення.'
      },
      {
        name: 'Боб Сміт',
        role: 'Фронтенд-розробник',
        biography: 'Боб спеціалізується на React та Next.js з розробці з створенням зручних для користувачів інтерфейсів.'
      },
      {
        name: 'Керол Вільямс',
        role: 'Бекенд-розробник',
        biography: 'Керол є фулстек-розробницею, яка насолоджується архітектурою та масштабованими рішеннями.'
      },
      {
        name: 'Девід Браун',
        role: 'UX Дизайнер',
        biography: 'Девід створює красиві та інтуїтивні дизайни, які покращують користувацький досвід.'
      }
    ],
    ru: [
      {
        name: 'Алиса Джонсон',
        role: 'Руководитель проекта',
        biography: 'Алиса является руководителем проекта с более чем 10-летним опытом в разработке программного обеспечения.'
      },
      {
        name: 'Боб Смит',
        role: 'Фронтенд-разработчик',
        biography: 'Боб специализируется на React и Next.js в разработке с страстью к созданию пользовательских интерфейсов.'
      },
      {
        name: 'Кэрол Вильямс',
        role: 'Бэкенд-разработчик',
        biography: 'Кэрол является фулстек-разработчицей, которая наслаждается архитектурой и масштабируемыми решениями.'
      },
      {
        name: 'Дэвид Браун',
        role: 'UX Дизайнер',
        biography: 'Дэвид создает красивые и интуитивные дизайны, которые улучшают пользовательский опыт.'
      }
    ]
  };

  const teamMembers = teamData[language as keyof typeof teamData] || teamData.en;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {teamMembers.map((member: TeamMember, index: number) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
          <h4 className="text-gray-600 mb-4">{member.role}</h4>
          <p className="text-gray-700">{member.biography}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutTeam;