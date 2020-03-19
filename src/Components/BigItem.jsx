import React from 'react';
import axios from 'axios';

async function getPicture(link){
  return await axios('https://mrsoft.by/tz20'+link);
}

export class BigItem extends React.Component{
  state = {
    picture: {}
  };

  async componentDidMount(){
    let result = await getPicture(this.props.item.more);

    this.setState({
      picture: result
    });
  };

  render(){

  const item = this.props.item;
  const picture = this.state.picture;

  if(Object.keys(this.state.picture).length !== 0){
    return (
      <div className="big-item">
        <div className="big-item-text-container">
          <h1 >{item.name}</h1>
          <h2>{item.shortInfo}</h2>
          <p>{picture.data.bio}</p>
        </div>
        <div className="item-picture">
          <img src={`https://mrsoft.by/tz20${picture.data.pic}`} alt="картинка с сервера"/>
        </div>
      </div>    
    );
  }else{
    return (
      <div>Loading</div>
    );
  }
}}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quos dolor sint ipsa consectetur suscipit fugit sed vitae dolore molestiae asperiores possimus labore ex saepe, odit tenetur accusamus ipsum debitis.
// Eligendi eaque incidunt consectetur debitis rem optio ipsam, placeat alias, quaerat eveniet iure aperiam magnam aliquam autem, est ea! Reiciendis magni consequatur doloremque dolorum laudantium deserunt nesciunt unde. Quia, in!
// Similique, sapiente. Eligendi dolorem repellendus delectus sapiente deleniti odio debitis, doloremque voluptates alias perspiciatis eveniet ducimus ea obcaecati dignissimos modi nobis! Maiores officiis quaerat quam voluptatem tenetur praesentium iste amet.
// Odio, facere dicta. Commodi, nulla eius. Accusantium officiis, vitae corrupti odit at quisquam, animi, qui omnis nemo a maxime atque dolorem! Odio veniam consectetur nostrum ratione sapiente quasi laudantium suscipit!
// Repellat consectetur officiis dolorem ea ipsa beatae dolore excepturi natus maiores, nulla ipsum reprehenderit minus rem odio ut doloremque iusto fugiat dicta a. Rerum molestiae aliquam expedita nemo delectus necessitatibus?
// Iste architecto, placeat repellat repudiandae possimus dolorum modi, quidem illo itaque, sed aliquam cum laborum id! Laudantium voluptatibus, animi dolorum reiciendis quam eveniet repellat ipsum, qui ea recusandae nostrum ut!
// Fugiat adipisci officiis rem quaerat corrupti ex libero officia cumque sunt aspernatur dignissimos saepe ipsum, reprehenderit facilis? Reiciendis amet, voluptatibus repudiandae inventore, itaque eligendi dolor voluptas autem eos fugit doloribus.
// Praesentium, recusandae voluptate? Sunt officiis reiciendis odio vero! Enim itaque magnam eligendi nesciunt illum quasi neque, ullam perspiciatis earum, quis sunt eaque? Quia perspiciatis quasi ex non pariatur, saepe nemo!
// Eum, fugiat. Iusto, voluptas minima aperiam ipsum qui, fugiat inventore cum maxime alias blanditiis consequuntur impedit veniam nulla commodi, ipsa voluptate tempore repudiandae! Magni sint pariatur corrupti nostrum in placeat.
// Aspernatur repellendus corporis omnis voluptate? At, laudantium, placeat quasi iusto id labore, accusamus incidunt consequatur repudiandae asperiores itaque saepe quam autem eaque obcaecati libero officia animi! Rem delectus placeat debitis.
