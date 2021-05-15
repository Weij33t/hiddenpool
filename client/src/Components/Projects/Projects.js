import React, { useState } from 'react'

import Project from '../../images/Projects/project.png'
import cls from './Projects.module.sass'
import { AppWrapper } from '../../App.module.sass'
import { projectsBd } from '../../bd.imitation.js'

function Projects() {
  const filledArray = [...projectsBd].fill(0, 1).fill(1, 0, 1)
  const [projects, setProjects] = useState([...filledArray])

  const chooseItem = (index, e) => {
    filledArray.fill(0)
    filledArray[index] = 1
    setProjects([...filledArray])
  }

  return (
    <div className={cls.Projects} id="Projects">
      <div className={AppWrapper}>
        <h2>Топ лучших проектов</h2>
        <div className={cls.ProjectsContent}>
          <ul className={cls.ProjectsList}>
            {projectsBd.map((project, index) => {
              console.log(projects)
              return (
                <li
                  className={`${projects[index] ? cls.ProjectsActive : ''}`}
                  onClick={(e) => chooseItem(index, e)}
                  key={`${project.name}${index}`}
                >
                  {project.name}
                </li>
              )
            })}
          </ul>
          <div className={cls.ProjectsImages}>
            {projectsBd.map((item, index) => {
              return (
                <div
                  className={cls.ProjectsItem}
                  key={`${index}${item.name}`}
                  style={{ display: `${projects[index] ? 'block' : 'none'}` }}
                >
                  <img
                    srcSet={`/projects/${index + 1}.png`}
                    alt={'Проект, сделанный в IT-центре'}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Projects
