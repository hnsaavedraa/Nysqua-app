import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { FiBell } from 'react-icons/fi';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import {FaAngleLeft} from "react-icons/fa";
import {FaAngleRight} from "react-icons/fa";
import Dots from 'react-carousel-dots';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider } from '@material-ui/styles';
import { FiUpload } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import ReactDOM from 'react-dom';

import './ClothesAssistant.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class ClothesAssistant extends Component {
    constructor(props) {
        super(props);
        this.state={
            step: 0,
            productTitle: "",
            userData:this.props.userData,
            token: this.props.token,
            productDescription: "",
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            subcategories: [],
            sizes: [],
            usedTime: " ",
            clothesStates: [{ name: "Muy usado", checked: false },
                            { name: "Usado", checked: false },
                            { name: "Poco usado", checked: false },
                            { name: "Como nuevo", checked: false },
                            { name: "Nuevo", checked: false },],
            clothe_img_1:"",
            flag_img_1: false,
            clothe_img_2:"",
            flag_img_2: false,
            clothe_img_3:"",
            flag_img_3: false,
            clothe_img_4:"",
            flag_img_4: false,
            clothe_img_5:"",
            flag_img_5: false,
            tags: [{
                    id: "Thailand",
                    text: "Thailand"
                },
                {
                    id: "India",
                    text: "India"
                }
            ],
        };

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleTextInputChange = this.handleTextInputChange.bind(this);
        this.handleCategorySelected = this.handleCategorySelected.bind(this);
        this.handleUsedTimeChange = this.handleUsedTimeChange.bind(this);
        this.onImageChange1 = this.onImageChange1.bind(this);
        this.onImageChange2 = this.onImageChange2.bind(this);
        this.onImageChange3 = this.onImageChange3.bind(this);
        this.onImageChange4 = this.onImageChange4.bind(this);
        this.onImageChange5 = this.onImageChange5.bind(this);
        this.handleTagDelete = this.handleTagDelete.bind(this);
        this.handleTagAddition = this.handleTagDelete.bind(this);
        let assistantSwipe;

        this.StyledTextField = withStyles({
            root: {
                width: '60% !important',
                marginTop: '48px',
                fontFamily: 'Product Sans !important',
                '& label.Mui-focused': {
                    color: 'white',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: 'white',
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.75);',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'white',
                    },
                },
            },
        })(TextField);

        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: "#FFF",
                    contrastText: '#FFF',
                },
                secondary: {
                    main: "#FFF",
                },
                tr: {
                    background: "#f1f1f1",
                    '&:hover': {
                        background: "#FFF",
                    },
                },
            },
        });
    }

    handleNext(){
        this.assistantSwipe.next();
        if(this.state.step != 6){
            this.setState({
                step: this.state.step + 1
            });
        }

        if(this.state.step == 1){
            console.log(this.state.checked1);
            console.log(this.state.checked2);
            console.log(this.state.checked3);
            console.log(this.state.checked4);
            console.log(this.state.checked5);
            console.log("\n");

            axios.post('http://localhost:3001/assistant/categories', {
                checked1: this.state.checked1,
                checked2: this.state.checked2,
                checked3: this.state.checked3,
                checked4: this.state.checked4,
                checked5: this.state.checked5,
            })
            .then((response) => {
                var serverResponse = response.data.out;
                var serverSubCategories = [];
                var subCategories = [];

                serverResponse.map((e, i) => !serverSubCategories.includes(e) && serverSubCategories.push(e))

                for (var i = 0; i < serverSubCategories.length; i++) {
                    subCategories.push({
                        name: serverSubCategories[i],
                        checked: false
                    });
                }
                console.log(subCategories);
                this.setState({
                    subcategories: subCategories
                });

            }, (error) => {
                console.log(error);
            });
        } else if(this.state.step == 2){

            let sizesListAux = [];
            if (this.state.checked1 || this.state.checked2) {
                sizesListAux = [{ name: "talla XS", checked: false },
                                { name: "talla S", checked: false },
                                { name: "talla M", checked: false },
                                { name: "talla L", checked: false },
                                { name: "talla XL", checked: false },
                                { name: "talla XXL", checked: false },
                                { name: "talla 3XL", checked: false },];
            } else if (this.state.checked3 || this.state.checked4) {
                sizesListAux = [{ name: "talla 2", checked: false },
                                { name: "talla 4", checked: false },
                                { name: "talla 5", checked: false },
                                { name: "talla 6", checked: false },
                                { name: "talla 7", checked: false },
                                { name: "talla 8", checked: false },
                                { name: "talla 10", checked: false },
                                { name: "talla 12", checked: false },
                                { name: "talla 14", checked: false },];
            }  else if (this.state.checked5) {
                sizesListAux = [{ name: "3-6 meses", checked: false },
                                { name: "6-12 meses", checked: false },
                                { name: "12-18 meses", checked: false },
                                { name: "18-24 meses", checked: false },
                                { name: "2-3 años", checked: false },
                                { name: "4-5 años", checked: false },];
            }

            this.setState({
                sizes: sizesListAux
            });
        }
    }

    handleBack(){
        this.assistantSwipe.prev();
        if (this.state.step != 0){
            this.setState({
                step: this.state.step - 1
            });
        }
    }

    handleTextInputChange(event) {
        var prop = String(event.target.id);
        this.setState({
            [prop]: event.target.value
        });
    }

    handleCategorySelected(event) {
        //always use currentTarget
        let categoriesIds = ["checked1", "checked2", "checked3", "checked4", "checked5"];
        var prop = "checked" + event.currentTarget.id.toString();
        let index = categoriesIds.indexOf(prop);
        categoriesIds.splice(index, 1);

        this.setState({
            [prop]: !this.state[prop]
        });

        const newState = {};

        categoriesIds.forEach(function(id){
            newState[id] = false;
        });

        this.setState(newState);
    }

    handleUsedTimeChange(event) {
        this.setState({
            usedTime: event.target.value
        });
    }
    onImageChange1 = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ clothe_img_1: e.target.result });
                this.setState({flag_img_1 : true});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }
    onImageChange2 = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ clothe_img_2: e.target.result });
                this.setState({flag_img_2 : true});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }
    onImageChange3 = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ clothe_img_3: e.target.result });
                this.setState({flag_img_3 : true});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }
    onImageChange4 = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ clothe_img_4: e.target.result });
                this.setState({flag_img_4 : true});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }
    onImageChange5 = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ clothe_img_5: e.target.result });
                this.setState({flag_img_5 : true});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        
    }

    handleTagDelete(i) {
        const {
            tags
        } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleTagDelete(tag) {
        this.setState(state => ({
            tags: [...state.tags, tag]
        }));
    }

    render(){
console.log(this.state.userData);
        let subcategoriesList;

        const handleSubcategoryCheckChange = (event) => {

            let newSubcategories = this.state.subcategories;
            let prop = event.currentTarget.value.toString();
            for (var i = 0; i < this.state.subcategories.length; i++) {
                if (this.state.subcategories[i].name == prop) {
                    newSubcategories[i].checked = !newSubcategories[i].checked;
                }else{
                    newSubcategories[i].checked = false;
                }
            }

            this.setState({
                subcategories: newSubcategories
            });
        };

        if (this.state.subcategories.length > 0){
            subcategoriesList = this.state.subcategories.map(function (d) {
                var idstr = "checkbox" + d.name;

                return (<ul className="ks-cboxtags">
                    <li>
                        <input type="checkbox" id={idstr}
                            value={d.name}
                            onClick={handleSubcategoryCheckChange}
                            checked = {d.checked}
                        />
                        <label htmlFor={idstr}>{d.name}</label>
                    </li>
                </ul>);
            });
        }else{
            subcategoriesList = <p>Debes seleccionar una categoria primero para ver las posibles subcategorias a las que se ajusta la prenda</p>
        }

        let sizesList;

        const handleSizeCheckChange = (event) => {

            let newSizes = this.state.sizes;
            let prop = event.currentTarget.value.toString();
            for (var i = 0; i < this.state.sizes.length; i++) {
                if (this.state.sizes[i].name == prop) {
                    newSizes[i].checked = !newSizes[i].checked;
                }else{
                    newSizes[i].checked = false;
                }
            }

            this.setState({
                sizes: newSizes
            });
        };

        if (this.state.sizes.length > 0) {
            sizesList = this.state.sizes.map(function (d) {
                var idstr = "checkbox" + d.name;

                return (<ul className="ks-cboxtags">
                    <li>
                        <input type="checkbox" id={idstr}
                            value={d.name}
                            onClick={handleSizeCheckChange}
                            checked = {d.checked}
                        />
                        <label htmlFor={idstr}>{d.name}</label>
                    </li>
                </ul>);
            });
        }else{
            sizesList = <p className="clothes_assistant_detail_warning">Debes seleccionar una categoria primero para ver las posibles tallas a las que se ajusta la prenda</p>
        }

        let statesList;

        const handleStateCheckChange = (event) => {

            let newStates = this.state.clothesStates;
            let prop = event.currentTarget.value.toString();
            for (var i = 0; i < this.state.clothesStates.length; i++) {
                if (this.state.clothesStates[i].name == prop) {
                    newStates[i].checked = !newStates[i].checked;
                }else{
                    newStates[i].checked = false;
                }
            }

            this.setState({
                clothesStates: newStates
            });
        };

        statesList = this.state.clothesStates.map(function (d) {
            var idstr = "checkbox" + d.name;

            return (<ul className="ks-cboxtags">
                <li>
                    <input type="checkbox" id={idstr}
                        value={d.name}
                        onClick={handleStateCheckChange}
                        checked = {d.checked}
                    />
                    <label htmlFor={idstr}>{d.name}</label>
                </li>
            </ul>);
        });

        return(      
            <div className="clothes_assistant_container">
                <div className="clothes_assistant">
                    <IconContext.Provider value={{ size: "2.5em ", className: 'clothes_assistant_left_arrow'}}>
                        <FaAngleLeft onClick={this.handleBack}/>
                    </IconContext.Provider>
                    <IconContext.Provider value={{ size: "2.5em ", className: 'clothes_assistant_right_arrow'}}>
                        <FaAngleRight onClick={this.handleNext}/>
                    </IconContext.Provider>
                    <ReactSwipe
                        className = "clothes_assistant_carousel"
                        swipeOptions={{ continuous: false }}
                        ref={el => (this.assistantSwipe = el)}>
                        <div className="clothes_assistant_content">
                            <h1>Danos un título para la prenda que vas a subir</h1>
                            < this.StyledTextField
                                    variant = "outlined"
                                    margin = "normal"
                                    fullWidth
                                    id = "productTitle"
                                    label = "Titulo para tu prenda"
                                    name = "productTitle"
                                    autoComplete = ""
                                    onChange = {
                                        this.handleTextInputChange
                                    }
                            />
                        </div>
                        <div className="clothes_assistant_content">
                            <h1>¿A que categoría pertenece la prenda?</h1>
                            <div className="clothes_assistant_categories_container">
                                <Grid 
                                    container
                                    spacing={6}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "center">
                                    
                                    <Grid item xs={4}>
                                        <div className="clothes_categories" id="1" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked1 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="clothes_categories_txt_1">Ropa para</h6>
                                                <h6 className="clothes_categories_txt left">hombre</h6>
                                            </div>
                                            <img className="clothes_categories_img"
                                                src="http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg">
                                            </img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="clothes_categories" id="2" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked2 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="clothes_categories_txt_1">Ropa para</h6>
                                                <h6 className="clothes_categories_txt left">mujer</h6>
                                            </div>
                                            <img className="clothes_categories_img"
                                                src="http://image27.choichic.com/o_img/2018/03/04/252822-10530412/women-s-fashion-front-zip-mesh-jacket.jpg">
                                            </img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="clothes_categories" id="3" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked3 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="clothes_categories_txt_1">Ropa para</h6>
                                                <h6 className="clothes_categories_txt left">niños</h6>
                                            </div>
                                            <img className="clothes_categories_img"
                                                src="https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw26b0e681/AJ8064_W9D_20.jpg">
                                            </img>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="clothes_assistant_categories_container_2">
                                <Grid 
                                    container
                                    spacing={6}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "center">
                                    
                                    <Grid item xs={6}>
                                        <div className="clothes_categories" id="4" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked4 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="clothes_categories_txt_1">Ropa para</h6>
                                                <h6 className="clothes_categories_txt left">niñas</h6>
                                            </div>
                                            <img className="clothes_categories_img"
                                                src="https://cdn.shopify.com/s/files/1/1017/0329/products/isla-dress-ghosty-raspberry-socks-websized_2000x.jpg?v=1567646051">
                                            </img>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="clothes_categories" id="5" onClick={this.handleCategorySelected}>
                                            <div className={this.state.checked5 ? "clothes_categories_img_overlay_selected" : "clothes_categories_img_overlay"}>
                                                <h6 className="clothes_categories_txt_1">Ropa para</h6>
                                                <h6 className="clothes_categories_txt left">bebes</h6>
                                            </div>
                                            <img className="clothes_categories_img"
                                                src="http://www.babyfashions.us/wp-content/uploads/2018/09/Baby-Fashion-Buying-the-Trendiest-Infant-Clothes.jpeg">
                                            </img>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                        <div className="clothes_assistant_content">
                            <h1>¿A que subcategoría pertenece la prenda?</h1>
                            <div className="clothes_subcategories_container">
                                {subcategoriesList}
                            </div>
                        </div>
                        <div className="clothes_assistant_content">
                            <h1>Detalles de la prenda</h1>
                            <div className="clothes_assistant_details_container">
                                <div className="clothes_assistant_detail_content">
                                    <h3>¿De que talla es la prenda?</h3>
                                    <div className="clothes_assistant_details_sizes_container">
                                        {sizesList}
                                    </div>
                                </div>
                                <div className="clothes_assistant_detail_content">
                                    <h3>¿De que color es la prenda?</h3>
                                    <div className="clothes_assistant_details_sizes_container">
                                        {statesList}
                                    </div>
                                </div>
                                <div className="clothes_assistant_detail_content">
                                    <h3>¿Cuánto tiempo has usado esta prenda?</h3>
                                    <div className="clothes_assistant_detail_usedtime_container">
                                        <ThemeProvider theme={this.theme}>
                                            <FormControl
                                                variant="outlined"
                                                fullWidth>
                                                <Select
                                                    label="Tiempo de uso"
                                                    value={this.state.usedTime}
                                                    onChange={this.handleUsedTimeChange}>
                                                    <MenuItem value=" ">Selecciona tiempo de uso</MenuItem>
                                                    <MenuItem value="0">Nuevo</MenuItem>
                                                    <MenuItem value="1">Menos de 6 meses</MenuItem>
                                                    <MenuItem value="2">Entre 6 meses y un año</MenuItem>
                                                    <MenuItem value="3">Entre 1 y 2 años</MenuItem>
                                                    <MenuItem value="4">Entre 2 y 3 años</MenuItem>
                                                    <MenuItem value="5">Entre 3 y 4 años</MenuItem>
                                                    <MenuItem value="6">Mas de 5 años</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </ThemeProvider>
                                    </div>
                                </div>
                                <div className="clothes_assistant_detail_content">
                                    <h3>¿En que estado se encuentra la prenda?</h3>
                                    <div className="clothes_assistant_details_sizes_container">
                                        {statesList}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clothes_assistant_content">
                            <div className="clothes_assistant_content_padding"></div>
                            <h1>Agrega una breve descripción de la prenda</h1>
                            <p>Esta descripción ayudará a otros usuarios a tener más detalles sobre la prenda, sin embargo, esta es OPCIONAL</p>
                            < this.StyledTextField
                                variant = "outlined"
                                margin = "normal"
                                fullWidth
                                id = "productDescription"
                                label = "Descripcion para tu prenda"
                                name = "productDescription"
                                autoComplete = ""
                                multiline
                                rows = "4"
                                rowsMax = "4"
                                onChange = {
                                    this.handleTextInputChange
                                }
                            />
                        </div>
                        <div className="clothes_assistant_content">
                            <h1>Sube imágenes de la prenda</h1>
                            <div className="clothes_assistant_imgs_upload_container">
                                <div className="clothes_assistant_img_upload_container">
                                        <label htmlFor="file-input1" >
                                        <div className="clothes_assistant_img_upload">
                                            <div className = "clothes_assistant_img" >
                                                <div className={this.state.flag_img_1 ? "clothes_assistant_upload_img_overlay" : "clothes_assistant_upload_img_overlay_hidden"}></div>
                                                <IconContext.Provider value={{ size: "2em", className: 'clothes_assistant_upload_icon' }}>
                                                    <div className={this.state.flag_img_1 ? "clothes_assistant_edit_btn" : "clothes_assistant_upload_btn"}>
                                                        {this.state.flag_img_1 ? <FiEdit2 /> : <FiUpload />}
                                                    </div>
                                                </IconContext.Provider>
                                                <img id="target"  src={this.state.clothe_img_1}></img>
                                            </div>
                                        </div>
                                    </label>
                                    <input id="file-input1"  type="file" onChange={this.onImageChange1} />
                                </div>
                                <div className="clothes_assistant_img_upload_container">
                                        <label htmlFor="file-input2" >
                                        <div className="clothes_assistant_img_upload">
                                            <div className = "clothes_assistant_img" >
                                                <div className={this.state.flag_img_2 ? "clothes_assistant_upload_img_overlay" : "clothes_assistant_upload_img_overlay_hidden"}></div>
                                                <IconContext.Provider value={{ size: "2em", className: 'clothes_assistant_upload_icon' }}>
                                                    <div className={this.state.flag_img_2 ? "clothes_assistant_edit_btn" : "clothes_assistant_upload_btn"}>
                                                        {this.state.flag_img_2 ? <FiEdit2 /> : <FiUpload />}
                                                    </div>
                                                </IconContext.Provider>
                                                <img id="target"  src={this.state.clothe_img_2}></img>
                                            </div>
                                        </div>
                                    </label>
                                    <input id="file-input2"  type="file" onChange={this.onImageChange2} />
                                </div>
                                <div className="clothes_assistant_img_upload_container">
                                        <label htmlFor="file-input3" >
                                        <div className="clothes_assistant_img_upload">
                                            <div className = "clothes_assistant_img" >
                                                <div className={this.state.flag_img_3 ? "clothes_assistant_upload_img_overlay" : "clothes_assistant_upload_img_overlay_hidden"}></div>
                                                <IconContext.Provider value={{ size: "2em", className: 'clothes_assistant_upload_icon' }}>
                                                    <div className={this.state.flag_img_3 ? "clothes_assistant_edit_btn" : "clothes_assistant_upload_btn"}>
                                                        {this.state.flag_img_3 ? <FiEdit2 /> : <FiUpload />}
                                                    </div>
                                                </IconContext.Provider>
                                                <img id="target"  src={this.state.clothe_img_3}></img>
                                            </div>
                                        </div>
                                    </label>
                                    <input id="file-input3"  type="file" onChange={this.onImageChange3} />
                                </div>
                            </div>
                            <div className="clothes_assistant_imgs_upload_container">
                                <div className="clothes_assistant_img_upload_container">
                                        <label htmlFor="file-input4" >
                                        <div className="clothes_assistant_img_upload">
                                            <div className = "clothes_assistant_img" >
                                                <div className={this.state.flag_img_4 ? "clothes_assistant_upload_img_overlay" : "clothes_assistant_upload_img_overlay_hidden"}></div>
                                                <IconContext.Provider value={{ size: "2em", className: 'clothes_assistant_upload_icon' }}>
                                                    <div className={this.state.flag_img_4 ? "clothes_assistant_edit_btn" : "clothes_assistant_upload_btn"}>
                                                        {this.state.flag_img_4 ? <FiEdit2 /> : <FiUpload />}
                                                    </div>
                                                </IconContext.Provider>
                                                <img id="target"  src={this.state.clothe_img_4}></img>
                                            </div>
                                        </div>
                                    </label>
                                    <input id="file-input4"  type="file" onChange={this.onImageChange4} />
                                </div>
                                <div className="clothes_assistant_img_upload_container">
                                        <label htmlFor="file-input5" >
                                        <div className="clothes_assistant_img_upload">
                                            <div className = "clothes_assistant_img" >
                                                <div className={this.state.flag_img_5 ? "clothes_assistant_upload_img_overlay" : "clothes_assistant_upload_img_overlay_hidden"}></div>
                                                <IconContext.Provider value={{ size: "2em", className: 'clothes_assistant_upload_icon' }}>
                                                    <div className={this.state.flag_img_5 ? "clothes_assistant_edit_btn" : "clothes_assistant_upload_btn"}>
                                                        {this.state.flag_img_5 ? <FiEdit2 /> : <FiUpload />}
                                                    </div>
                                                </IconContext.Provider>
                                                <img id="target"  src={this.state.clothe_img_5}></img>
                                            </div>
                                        </div>
                                    </label>
                                    <input id="file-input5"  type="file" onChange={this.onImageChange5} />
                                </div>
                            </div>
                        </div>
                        <div className="clothes_assistant_content">
                            <h1>Agrega etiquetas que identifique esta prenda (opcional)</h1>
                            <div className="clothes_assistant_tags_container">
                                <ReactTags tags={this.state.tags}
                                    handleDelete={this.handleTagDelete}
                                    handleAddition={this.handleTagAddition}
                                    delimiters={delimiters} />
                            </div>
                        </div>
                    </ReactSwipe>
                </div>
                <div className="clothes_assistant_footer">
                    <Dots className="clothes_assistant_dots_indicator" length={7} active={this.state.step} visible={7} margin={4} size={12}/>
                </div>
            </div>
        );
    }
}
export default ClothesAssistant;  
