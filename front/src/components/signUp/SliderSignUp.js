import React, { Component } from "react";

import Slider from 'react-animated-slider';
import verticalCss from  'react-animated-slider/build/vertical.css';
import './SignUp.css';

class SliderSignUp extends Component {
    constructor(props) {    
      super(props);
      this.content = [
        {
          title: 'Vulputate Mollis Ultricies Fermentum Parturient',
          description:
          'Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis.',
          button: 'Read More',
          image: 'https://i.imgur.com/ZXBtVw7.jpg',
          user: 'Luan Gjokaj',
          userProfile: 'https://i.imgur.com/JSW6mEk.png'
        },
        {
          title: 'Tortor Dapibus Commodo Aenean Quam',
          description:
          'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
          button: 'Discover',
          image: 'https://i.imgur.com/DCdBXcq.jpg',
          user: 'Erich Behrens',
          userProfile: 'https://i.imgur.com/0Clfnu7.png'
        },
        {
          title: 'Phasellus volutpat metus',
          description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
          button: 'Buy now',
          image: 'https://i.imgur.com/DvmN8Hx.jpg',
          user: 'Bruno Vizovskyy',
          userProfile: 'https://i.imgur.com/4KeKvtH.png'
        }
      ]

    };
  

    
    render(){
  
        return(
  <Slider classNames={verticalCss}  direction="vertical" autoplay={3000}   >
  {this.content.map((article, index) => <div key={index}>
    <img src= {article.image}/>
    <h2>{article.title}</h2>
    <div>{article.description}</div>
  </div>)}
</Slider>
        );
    };

    

};

export default SliderSignUp;