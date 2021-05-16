import React, { useEffect, useState } from 'react'

import cls from '../Profile/Profile.module.sass'
import comp from '../Companies/Companies.module.sass'
import icons from '../../styles/style.module.css'
import Feed from '../../fonts/feed.svg'
import Like from '../../fonts/like.svg'
import { AppWrapper } from '../../App.module.sass'
import marked from 'marked'
import { Link, NavLink } from 'react-router-dom'
import { GET_ALL_PROJECTS } from '../../query/project'
import { useQuery } from '@apollo/client'

function Project({ location }) {
  const { state } = location
  const { data, loading } = useQuery(GET_ALL_PROJECTS)
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState({})

  useEffect(() => {
    if (!loading) {
      setProjects(data.getAllProjects)
    }
  }, [data])

  function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  return (
    <div className={AppWrapper}>
      <div className={cls.Profile}>
        <h1>Проект {state.name}</h1>

        <hr />
        <div
          className={cls.ContentWrapper}
          style={{ marginTop: '30px', alignItems: 'center' }}
        >
          <img src={state.image} width={550} />
          <div className={cls.TextContent}>
            <div className={cls.TextTitle}>
              <h2 style={{ fontSize: '45px' }}>О Проекте</h2>
              <div className={cls.Stats}>
                <span>
                  {state.posts}&nbsp; <img srcSet={Feed} />{' '}
                </span>
                <span>
                  {state.likes}&nbsp;
                  <img srcSet={Like} />{' '}
                </span>
              </div>
            </div>
            <div
              className={cls.Desc}
              style={{ border: 'none' }}
              dangerouslySetInnerHTML={{
                __html: marked(state.desc ?? ''),
              }}
            ></div>
          </div>
        </div>
        <h2 style={{ textAlign: 'left' }}>Другие проекты</h2>
        <div className={cls.Projects + ' ' + comp.Companies}>
          {projects.map((project, index) => {
            return (
              <div
                className={comp.Company + ' ' + cls.Project}
                key={project.id}
              >
                <div className={comp.CompanyImage + ' ' + cls.ProjectImage}>
                  <img srcSet={`/companies/${index + 1}.png`} />
                  <div className={comp.CompanyStats}>
                    <div style={{ marginLeft: 'auto' }}>
                      <span className={comp.CompanyCount}>{project.likes}</span>
                      <img srcSet={Like} alt={'Feed'} />
                    </div>
                  </div>
                </div>

                <div className={comp.CompanyContent + ' ' + cls.ProjectContent}>
                  <h3 className={comp.CompanyName}>{project.name}</h3>
                  <div
                    className={comp.CompanyDesc}
                    dangerouslySetInnerHTML={{
                      __html: marked(project?.desc ?? ''),
                    }}
                  ></div>
                  <Link
                    to={{
                      pathname: `/projects/${project.id}`,
                      state: {
                        name: project.name,
                        desc: project.desc,
                        image: `/companies/${getRandomInt(6)}.png`,
                        likes: project.likes,
                      },
                    }}
                  >
                    Смотреть
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Project
