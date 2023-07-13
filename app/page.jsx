import Feed from "@components/Feed"

const Home = () => {
  return (
    // <div>Home</div>
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
        <p className="desc text-center">
          Promptopia is an open-source AI prompting tool for the modern world to discover, create and share creative prompts
        </p>

        {/* Feed */}
        <Feed />
      </h1>
    </section>
  )
}

export default Home 