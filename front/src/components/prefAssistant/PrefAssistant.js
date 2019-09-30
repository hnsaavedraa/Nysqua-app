import React, { Component } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import { FaUserAlt } from 'react-icons/fa';
import { FaTshirt } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import AvatarImageCropper from 'react-avatar-image-cropper';
import TextField from '@material-ui/core/TextField';
import 'react-animated-slider/build/horizontal.css';
import './PrefAssistant.css';
import ReactSwipe from 'react-swipe';
import 'react-animated-slider/build/horizontal.css';
import Grid from '@material-ui/core/Grid';

class PrefAssistant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            bio: "",
            file: null,
            profilephoto: "https://media.biobiochile.cl/wp-content/uploads/2019/03/pikachu-750x400.jpg",
            checked1: true,
            checked2: true,
            checked3: true,
            checked4: true,
            checked5: true,
            subcategories:[{name:"test1",checked:true},{name:"test2",checked:false},{name:"test3",checked:false},{name:"test4",checked:false}]
        };

        this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
        this.primaryColor = '#E94057';

        this.steps = this.getSteps();
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlReset = this.handleReset.bind(this);
        this.colorlibStepIcon = this.colorlibStepIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        let reactSwipeEl;

        this.colorlibConnector = withStyles({
            root:{
                width: '100%',
            },
            alternativeLabel: {
                top: 27,
            },
            active: {
                '& $line': {
                    backgroundImage: this.gradient,
                },
            },
            completed: {
                '& $line': {
                    backgroundImage: this.gradient,
                },
            },
            line: {
                height: 5,
                border: 0,
                backgroundColor: '#eaeaf0',
                borderRadius: 1,
            },
        })(StepConnector);

        this.StyledButton = withStyles({
            root: {
                backgroundImage: this.gradient,
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                margin: '1vh 0vw 1vh 0vh',
                fontSize: '1.05rem',
                transitionProperty: 'opacity',
                transitionDuration: '0.1s',
                marginRight: '0px !important',
                '&:hover': {
                    opacity: 0.9,
                },
                '&:active': {
                    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                },
            },
        })(Button);

        this.BackButton = withStyles({
            root: {
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                color: this.primaryColor,
                height: 48,
                padding: '0',
                fontSize: '1.05rem',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                '&:active': {
                    backgroundColor: 'transparent',
                    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                },
            },
        })(Button);
        
        this.StyledTextField = withStyles({
            root: {
                '& label.Mui-focused': {
                    color: this.primaryColor,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: this.primaryColor,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.3);',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.6);',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: this.primaryColor,
                    },
                },
            },
        })(TextField);
    }

    onFormSubmit(event){
        event.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {  
                'content-type': 'multipart/form-data'
            }
        };
        console.log(formData);
       
        /*axios.post("/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        }); */
    }

    onImageChange = (event) => {
        this.setState({file:event.target.files[0]});
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({profilephoto: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      
    getSteps() {
        return ['Descripcion', 'Que ropa buscas?', 'Categorias'];
    }

    handleNext(){
        this.setState({activeStep: this.state.activeStep + 1});
        this.reactSwipeEl.next();
        console.log(this.state.checked1);
        console.log(this.state.checked2);
        console.log(this.state.checked3);
        console.log(this.state.checked4);
        console.log(this.state.checked5);
    }

    handleBack(){
        this.setState({activeStep: this.state.activeStep - 1});
        this.reactSwipeEl.prev();
    }

    handleReset(){
        this.setState({activeStep: 0});
    }

    colorlibStepIcon(props) {
        console.log(props);

        var iconClass = "";

        if (props.completed === true){
            iconClass = "completed";
        }
        
        if (props.completed === false){
            iconClass = "uncompleted";
        }

        if(props.active === true){
            iconClass = "active";
        }

        const icons = {
            1: < FaUserAlt /> ,
            2: < FaTshirt /> ,
            3: < FaTags /> ,
        };

        return (
            <div className={iconClass}>
                {icons[String(props.icon)]}
            </div>
        );
    }
    apply = (file) => {
        // handle the blob file you want
        // such as get the image src
        var src = window.URL.createObjectURL(file);
    }

    handleChange(event) {
        this.setState({
            bio: event.target.value
        });
    }

    handleCheckChange(event) {
        var changedProp = "checked" + event.currentTarget.value.toString();
        this.setState({
            [changedProp]: !this.state[changedProp]
        });
    }
    handleCheckChangeSub(event) {
        var changedProp = "checked" + event.currentTarget.value.toString();
        this.setState({
            [changedProp]: !this.state[changedProp]
        });
    }

    render(){
        
        const listItems = this.state.subcategories.map(function(d){
            var idstr = "checkbox" + d.name;

            return  <ul className="ks-cboxtags"> 
                        <li>
                            <input type="checkbox" id={idstr}
                                 value={d.name} 
                              /* checked={d.checked}  */
                              
                             />
                            <label for={idstr}>{d.name}</label> 
                        </li>   
                    </ul>
            
        })
        
        
        
        return(
            < div className = "preferences_assistant" >
                <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<this.colorlibConnector />}>
                        {this.steps.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={this.colorlibStepIcon}>{label}</StepLabel>
                        </Step>
                        ))}
                </Stepper>
                < div className = "card" >
                    <div className="content">
                       <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: false }}
                            ref={el => (this.reactSwipeEl = el)}>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">1. Informacion extra para tu perfil</h1>
                                </div>
                                <Grid container 
                                    spacing={0}
                                    direction = "column"
                                    justify = "center"
                                    alignItems = "center"
                                    wrap = "nowrap">
                                    <Grid item xs={6} sm={12} fullWidth>
                                        
                                    <div className="image-upload">
                                        < label htmlFor = "file-input" >
                                            <div className = "profilepic">
                                            <img  id ="target" className ="crop"  src ={this.state.profilephoto} ></img>
                                            </div>
                                            
                                        </label>
                                        <input id="file-input" name="myImage" type="file" onChange= {this.onImageChange} />
                                           {/*  <Button onClick={this.onFormSubmit}>mandelo</Button> */}
                                    </div>

                                    </Grid>
                                    <Grid item xs={6} sm={12} fullWidth>
                                        <h2>Cuentanos un poco sobre ti</h2>
                                    </Grid>
                                    <Grid item xs={6} sm={12} fullWidth>
                                        < this.StyledTextField
                                            variant = "outlined"
                                            margin = "normal"
                                            fullWidth
                                            id = "bio"
                                            label = "Tu biografia"
                                            name = "bio"
                                            autoComplete = "Bio"
                                            color = {this.primaryColor}
                                            multiline
                                            rows = "4"
                                            rowsMax = "10"
                                            onChange = {this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">2. Para quien buscas ropa?</h1>
                                </div>
                                <div className="second_container">
                                    <Grid container 
                                    spacing={1}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "center">
                                        <Grid item xs={4} sm={4}>
                                            <div className="type1">
                                                <div>
                                                    <div className="img_overlay">
                                                        <a class="tm-link left">Hombre</a>
                                                    </div>
                                                    <img 
                                                        src="http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg">
                                                    </img>
                                                </div>
                                                <div>
                                                    <input type="radio" name="yrdo_1" id="yes_1" 
                                                        value = {1}
                                                        checked={this.state.checked1}
                                                        onChange={this.handleCheckChange}></input>
                                                    <input type="radio" name="nrdo_1" id="no_1"
                                                        value = {1}
                                                        checked={!this.state.checked1}
                                                        onChange={this.handleCheckChange}></input>
                                                    <div id="switch_1">
                                                        <label htmlFor="yes_1">Si</label>
                                                        <label htmlFor="no_1">No</label>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <div className="type1">
                                                <div>
                                                    <div className="img_overlay">
                                                        <a class="tm-link left">Mujer</a>
                                                    </div>
                                                    <img
                                                        src="http://image27.choichic.com/o_img/2018/03/04/252822-10530412/women-s-fashion-front-zip-mesh-jacket.jpg">    
                                                    </img>
                                                </div>
                                                <div>
                                                    <input type="radio" name="yrdo_2" id="yes_2"
                                                        value = {2}
                                                        checked={this.state.checked2}
                                                        onChange={this.handleCheckChange}></input>
                                                    <input type="radio" name="nrdo_2" id="no_2"
                                                        value = {2}
                                                        checked={!this.state.checked2}
                                                        onChange={this.handleCheckChange}></input>
                                                    <div id="switch_2">
                                                        <label htmlFor="yes_2">Si</label>
                                                        <label htmlFor="no_2">No</label>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <div className="type1">
                                                <div>
                                                    <div className="img_overlay">
                                                        <a class="tm-link left">Niño</a>
                                                    </div>
                                                    <img
                                                        src="https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw26b0e681/AJ8064_W9D_20.jpg">    
                                                    </img>
                                                </div>
                                                <div>
                                                    <input type="radio" name="yrdo_3" id="yes_3"
                                                        value = {3}
                                                        checked={this.state.checked3}
                                                        onChange={this.handleCheckChange}></input>
                                                    <input type="radio" name="nrdo_3" id="no_3"
                                                        value = {3}
                                                        checked={!this.state.checked3}
                                                        onChange={this.handleCheckChange}></input>
                                                    <div id="switch_3">
                                                        <label htmlFor="yes_3">Si</label>
                                                        <label htmlFor="no_3">No</label>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <div className="type2">
                                                <div>
                                                    <div className="img_overlay">
                                                        <a class="tm-link left">Niña</a>
                                                    </div>
                                                    <img
                                                        src="https://cdn.shopify.com/s/files/1/1017/0329/products/isla-dress-ghosty-raspberry-socks-websized_2000x.jpg?v=1567646051">    
                                                    </img>
                                                </div>
                                                <div>
                                                    <input type="radio" name="yrdo_4" id="yes_4"
                                                        value = {4}
                                                        checked={this.state.checked4}
                                                        onChange={this.handleCheckChange}></input>
                                                    <input type="radio" name="nrdo_4" id="no_4"
                                                        value = {4}
                                                        checked={!this.state.checked4}
                                                        onChange={this.handleCheckChange}></input>
                                                    <div id="switch_4">
                                                        <label htmlFor="yes_4">Si</label>
                                                        <label htmlFor="no_4">No</label>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} sm={4}>
                                            <div className="type2">
                                                <div>
                                                    <div className="img_overlay">
                                                        <a class="tm-link left">Bebes</a>
                                                    </div>
                                                    <img
                                                        src="http://www.babyfashions.us/wp-content/uploads/2018/09/Baby-Fashion-Buying-the-Trendiest-Infant-Clothes.jpeg">    
                                                    </img>
                                                </div>
                                                <div>
                                                    <input type="radio" name="yrdo_5" id="yes_5"
                                                        value = {5}
                                                        checked={this.state.checked5}
                                                        onChange={this.handleCheckChange}></input>
                                                    <input type="radio" name="nrdo_5" id="no_5"
                                                        value = {5}
                                                        checked={!this.state.checked5}
                                                        onChange={this.handleCheckChange}></input>
                                                    <div id="switch_5">
                                                        <label htmlFor="yes_5">Si</label>
                                                        <label htmlFor="no_5">No</label>
                                                        <span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">3. Que categorias te interesan?</h1>
                                </div>
                                <div className="subcategories_container">
                                    {listItems}
                                </div>              
                            </div>
                        </ReactSwipe>
                    </div>
                    < div className = "buttons_container" >
                        < this.BackButton disableRipple = {true}
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}>
                            Back
                        </this.BackButton>
                        <this.StyledButton onClick={this.handleNext}>
                            {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                        </this.StyledButton>
                    </div>
                </div>
            </div>
        );
    }

}

export default PrefAssistant;