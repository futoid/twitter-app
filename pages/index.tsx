import Form from '../components/Form'
import Header from '../components/Header'
import PostFeed from '../components/Posts/PostFeed'
const Home= () => {
  
  return (
    <div>
      <Header label= "Home" showBackArrow = {false}/>
      <Form placeholder="What's happening?"/> 
      <PostFeed  />
    </div>
  )
}

export default Home
