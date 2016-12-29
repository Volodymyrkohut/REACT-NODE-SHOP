import React from "react";
import Lot from "../actions/ActionsLot.js";

class Create extends React.Component{
	constructor (props){
		super(props)
		this.state =  {
			category: 		"kids",
			name: 			"",
			price: 			"",
			description: 	"",
			text:           "",
			file:{}
		}
	}
	render(){
		console.log(this.state.category)
		return (
			<div>
			<lable> Виберіть будь-ласка категорію
				<select onChange={this._handleCategory.bind(this)} name="category">
					<option value="kids">Дитячий світ</option>
					<option value="bild">Нерухомість</option>
					<option value="house">Дім і сад</option>
					<option value="car">Транспорт</option>
					<option value="job">Робота</option>
					<option value="style">Мода стиль</option>
					<option value="hobbi">хоббі</option>
					<option value="electronic">Електроніка</option>
					<option value="animal">Тварини</option>
					<option value="bisenes">Бізнес</option>
				</select><br />

			</lable>
			<lable> Імя товару
				<input  type="text" 
						onChange={this._handleName.bind(this)} 
						value={this.state.name} 
						required/><br />	
			</lable>

			<lable> Введіть Короткий опис товару<br />
				<textarea   cols="30" 
							rows="5" 
							required 
							value={this.state.description} 
							onChange={this._handleDescription.bind(this)}>
				</textarea><br />
			</lable>
			
			<lable> Введіть повний опис товару<br />
				<textarea cols="30" 
						  rows="5" 
						  required 
						  value={this.state.text}
						  onChange={this._handleText.bind(this)}
						  ></textarea><br />
			</lable>


			<lable> Введіть ціну
				<input type="text" onChange={this._handlePrice.bind(this)} value={this.state.price} required/><br />	
			</lable>

			
			<lable>Виберіть будь-ласка картинки (Ctrl + mouse-left)<br />
				<input  required
						type="file" 
						multiple="true" 
						name="img" 
						accept="image/x-png,image/jpeg" 
						onChange={this._handleUpload.bind(this)}
				/>
			</lable><br/><br />
			<input type="submit" value="Публікація товару" onClick={this._handleSend.bind(this)}/>

			</div>
			)
	}
	_handleCategory(e){
		const value = e.target.value;
		this.setState({category: value})
	}
	_handleName(e){
		const value = e.target.value
		this.setState({name: value})
	}
	_handlePrice(e){
		const  value = e.target.value
		this.setState({price:value})
	}
	_handleDescription(e){
		this.setState({description: e.target.value})
	}
	_handleText(e){
		this.setState({text:e.target.value})
	}

//FOR UPLOAD /////////////////////////////////
	_handleUpload(e){
		let obj = e.target.files
		let formdata = new FormData();


		for(i in obj){
			if(obj.hasOwnProperty(i)){
				formdata.append("img", obj[i] )
			}
		}

		
		 this.setState({file: formdata})

	}
///////////////////////////////////////////////
_handleSend(){
	// var s = new FormData();
	// s.append("category", this.state.category)
	// s.append( this.state.file)
	// Lot.createLot()
	const {category,name,file,price,text,description} = this.state;
	file.append("category", category)
	file.append("name", name)
	file.append("price",price)
	file.append("text",text)
	file.append("description", description)
	
	 Lot.createLot(file)
}
}


export default Create;

/*





<lable> Виберіть будь-ласка категорію
				<select onChange={this.handle}>
					<option value="kids">Дитячий світ</option>
					<option value="bild">Нерухомість</option>
					<option value="house">Дім і сад</option>
					<option value="car">Транспорт</option>
					<option value="job">Робота</option>
					<option value="style">Мода стиль</option>
					<option value="hobbi">хоббі</option>
					<option value="electronic">Електроніка</option>
					<option value="animal">Тварини</option>
					<option value="bisenes">Бізнес</option>
				</select><br />

			</lable>
			
			<lable> Імя товару
				<input type="text" required/><br />	
			</lable>

			<lable> Введіть ціну
				<input type="text" required/><br />	
			</lable>
			
			<lable> Введіть Короткий опис товару<br />
				<textarea cols="30" rows="5" required></textarea><br />
			</lable>
			
			<lable> Введіть повний опис товару<br />
				<textarea cols="30" rows="5" required></textarea><br />
			</lable>
			












class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
React.render(<ImageUpload/>, document.getElementById("mainApp"));





*/




