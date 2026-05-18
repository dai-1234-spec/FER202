import React, { Suspense, lazy } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import pic1 from '../images/event-1.jpg'
import pic2 from '../images/event-2.jpg'
import pic3 from '../images/event-3.jpg'
import pic4 from '../images/event-4.jpg'
import pic5 from '../images/event-5.jpg'
import pic6 from '../images/event-6.jpg'
import pic7 from '../images/event-7.jpg'
import pic8 from '../images/event-8.jpg'
// import NewCard from './NewCard'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const loadComponent = () => {
  return delay(3000).then(() => import('./NewCard'));
};
const NewCard = lazy(loadComponent)

const newsLists = [
  { id: 1, title: 'Woman bakes expletive-laden pies to ‘get a rise’ out of her grandmother in annual tradition', description: '“What started as a means to get a rise out of my Grammy has snowballed into a weird family tradition,” wrote Jess Lydon.', images: pic1 },
  { id: 2, title: 'Martha Stewart shows off her 30 pies after canceled Thanksgiving dinner plans', description: 'Queen of Thanksgiving Martha Stewart may not be hosting a turkey dinner this year but fret not, she will still be celebrating with literally 30 pies.', images: pic2 },
  { id: 3, title: 'Burger King is testing a new breakfast sandwich', description: 'This is a win for the flatbread fans.', images: pic3 },
  { id: 4, title: 'Popeyes permanently adds chicken wings to its menu', description: 'And you can get ’em in five different flavors.', images: pic4 },
  { id: 5, title: 'Top salmon with a sizzling mix of aromatics and spices', description: 'Tadka is a ubiquitous South Asian technique that adds a dramatic last-minute coat of flavor.', images: pic5 },
  { id: 6, title: '80 Christmas dinner ideas for the ultimate holiday feast', description: 'Build the perfect Christmas menu with these delicious recipes.', images: pic6 },
  { id: 7, title: 'How to make the easiest prime rib roast for the holidays', description: 'Use these tips and tricks to make a juicy and amazingly delicious prime rib roast.', images: pic7 },
  { id: 8, title: 'Turn leftover turkey into a flavorful Waldorf salad', description: 'This light, bright turkey salad is the best post-Thanksgiving lunch.', images: pic8 },
]

const News = () => {
  return (
    <Container>
      <h2 className="my-5 text-danger">News Category</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Row>
          {newsLists.map(news => (
            <Col key={news.id} md={4} className="mb-4">
              <NewCard news={news} />
            </Col>
          ))}
        </Row>
      </Suspense>
    </Container>
  )
}

export default News