import './About.css'

export default function About() {
  return (
    <div>
      <section id="about" className="problem-solution">
        <div className="container">
          <div className="section-header">
            <h2>Bridging the Weather Forecasting Gap</h2>
            <p>Current weather apps only predict 1-2 weeks ahead. What about your vacation in 6 months?</p>
          </div>
          <div className="problem-solution-grid">
            <div className="problem-card">
              <div className="card-icon problem-icon">⚠️</div>
              <h3>The Problem</h3>
              <p>Outdoor activities depend heavily on weather, but existing forecasts only cover days to weeks. Planning months ahead faces uncertainty about extreme conditions, leading to ruined plans and safety risks.</p>
              <ul className="problem-list">
                <li>Short-term forecasts (days-weeks only)</li>
                <li>Uncertainty for long-term planning</li>
                <li>Financial losses from weather disruptions</li>
                <li>Safety risks from unexpected conditions</li>
              </ul>
            </div>
            <div className="solution-card">
              <div className="card-icon solution-icon">🚀</div>
              <h3>Our Solution</h3>
              <p>RAHLA Cast leverages NASA's decades of Earth observation data to calculate probabilities of extreme weather conditions months in advance, transforming complex datasets into actionable insights.</p>
              <ul className="solution-list">
                <li>Long-term probability insights</li>
                <li>NASA's trusted climate data</li>
                <li>AI-powered recommendations</li>
                <li>Interactive visualizations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
