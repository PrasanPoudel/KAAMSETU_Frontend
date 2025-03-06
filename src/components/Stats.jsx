import React from 'react'

const Stats = () => {
  return (
    <section className="body-font">
    <div className="container p-8 mx-auto">
      <div className="flex flex-wrap justify-between text-center">
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font  sm:text-4xl text-3xl">200+</h2>
          <p className="leading-relaxed">Users</p>
        </div>
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font  sm:text-4xl text-3xl">1k+</h2>
          <p className="leading-relaxed">Jobs Posted</p>
        </div>
        <div className="p-4 sm:w-1/4 w-1/2">
          <h2 className="title-font  sm:text-4xl text-3xl">250+</h2>
          <p className="leading-relaxed">Companies</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Stats