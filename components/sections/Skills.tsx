'use client'

import Image from 'next/image'

export interface Skill {
  name: string
  icon: string // Path to icon in /public/assets/icons/
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: [
      { name: 'TypeScript', icon: '/assets/icons/typescript.svg' },
      { name: 'JavaScript', icon: '/assets/icons/javascript.png' },
      { name: 'Python', icon: '/assets/icons/python.png' },
      { name: 'Java', icon: '/assets/icons/java.svg' },
      { name: 'SQL', icon: '/assets/icons/sql.png' },
      { name: 'CSS', icon: '/assets/icons/css.webp' },
      { name: 'HTML5', icon: '/assets/icons/html.png' },
    ],
  },
  {
    name: 'Frameworks',
    skills: [
      { name: 'Next.js', icon: '/assets/icons/nextjs.jpg' },
      { name: 'React', icon: '/assets/icons/react.png' },
      { name: 'React Native', icon: '/assets/icons/react.png' },
      { name: 'Node.js', icon: '/assets/icons/nodejs.png' },
      { name: 'Flask', icon: '/assets/icons/flask.png' },
      { name: 'SpringBoot', icon: '/assets/icons/spboot.jpeg' },
      { name: 'Streamlit', icon: '/assets/icons/streamlit.png' },
      { name: 'Pandas', icon: '/assets/icons/pandas.png' },
      { name: 'Numpy', icon: '/assets/icons/numpy.jpg' },
      { name: 'Spacy', icon: '/assets/icons/spacy.jpeg' },
      { name: 'scikit-learn', icon: '/assets/icons/sklearn.png' },
    ],
  },
  {
    name: 'Tools',
    skills: [
      { name: 'Git', icon: '/assets/icons/git.png' },
      { name: 'Docker', icon: '/assets/icons/docker.svg' },
      { name: 'AWS', icon: '/assets/icons/aws.png' },
      { name: 'Azure', icon: '/assets/icons/azure.png' },
      { name: 'Vercel', icon: '/assets/icons/vercel.svg' },
      { name: 'Sanity CMS', icon: '/assets/icons/sanity.png' },
    ],
  },
  {
    name: 'Databases',
    skills: [
      { name: 'PostgreSQL', icon: '/assets/icons/postgres.png' },
      { name: 'MongoDB', icon: '/assets/icons/mongodb.png' },
      { name: 'Supabase', icon: '/assets/icons/supabase.png' },
      { name: 'Firebase', icon: '/assets/icons/firebase.png' },
    ],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="bg-muted rounded-lg p-6 border border-border"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-3 px-4 py-3 bg-background rounded-lg border border-border hover:border-primary hover:scale-105 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    style={{ transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s' }}
                  >
                    <Image
                      src={skill.icon}
                      alt={`${skill.name} icon`}
                      width={28}
                      height={28}
                      className="flex-shrink-0"
                      style={{ borderRadius: '4px' }}
                    />
                    <span className="text-sm font-medium">{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
