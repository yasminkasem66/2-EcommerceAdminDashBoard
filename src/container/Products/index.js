import React, { useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Layout from '../../components/Layout'
import Input from '../../components/UI/Input';
import { CreateProducts } from '../../store/actions';
import Modal from '../../components/UI/Modal';


export const Products = () => {
    // forms Model to  add
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [productPictures, setProductPictures] = useState([]);
    const [productDetailModel, setproductDetailModel] = useState(false);
    const [productDetails, setproductDetails] = useState(null);
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // categories in options 
    const categoryFrmSt = useSelector(state => state.category);
    const createCategoryList = (categories, options = []) => {
        // let myCategories = [];
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options
    }
    // product pictures 
    const handleProductPictures = (e) => {
        setProductPictures([...productPictures, e.target.files[0]])
    }

    // create product 
    const dispatch = useDispatch();
    const CreateProduct = () => {
        const form = new FormData();
        form.append('name', name)
        form.append('quantity', quantity)
        form.append('price', price)
        form.append('description', description)
        form.append('category', category)

        for (let pic of productPictures) {
            form.append('productPictures', pic)
        }

        console.log("form", form)
        dispatch(CreateProducts(form))

    }
    //  render products  
    const product = useSelector(state => state.product);
    const renderProducts = (e) => {
        return (

            <Table style={{
                fontSize: 12
            }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.products.length > 0 ? product.products.map(prd =>
                            <tr key={prd._id} onClick={() => handleShowProductDetailModel(prd)}>
                                <td>3</td>
                                <td>{prd.name}</td>
                                <td>{prd.price}</td>
                                <td>{prd.quantity}</td>
                                <td>{prd.category.name}</td>
                            </tr>) : null
                    }

                </tbody>
            </Table>
        )
    }

    // handle Close detail model
    const handleCloseProductDetailModel = (prd) => {
        setproductDetailModel(false)
    }
    // handle Show detail model
    const handleShowProductDetailModel = (prd) => {
        setproductDetailModel(true);
        setproductDetails(prd)
    }
    const renderProductDetailsModal = (e) => {
        return (

            <>
                < Modal
                    show={productDetailModel}
                    handleClose={handleCloseProductDetailModel}
                    modalTitle={' PRODUCT Details'}
                    // action={CreateProduct}
                    size="lg"
                >

                   
                    <Row>
                        <Col md={6}>
                            <label className="fs-6 fw-bold">Name</label>
                            <p style={{
                                fontSize:'14px'
                            }} >{productDetails?.name}</p>

                        </Col >
                        <Col md={6}>
                            <label className="fs-6 fw-bold">Price</label>
                            <p style={{
                                fontSize:'14px'
                            }} >{productDetails?.price}</p>

                        </Col >
                    </Row>
                    <Row>
                        <Col md={6}>
                            <label className="fs-6 fw-bold">Quentity</label>
                            <p style={{
                                fontSize:'14px'
                            }} >{productDetails?.quantity}</p>

                        </Col >
                        <Col md={6}>
                            <label className="fs-6 fw-bold">Category</label>
                            <p style={{
                                fontSize:'14px'
                            }} >{productDetails?.category.name}</p>

                        </Col >
                    </Row>
                    <Row>
                        <Col md={12}>
                            <label className="fs-6 fw-bold">Description</label>
                            <p style={{
                                fontSize:'14px'
                            }} >{productDetails?.description}</p>

                        </Col >
                    </Row>

                    <Row>
                        <Col md={12}>
                            <label className="fs-6 fw-bold">Pictures</label>
                            <div className="d-flex flex-row justify-content-evenly" >

                                {productDetails?.productPictures.map(pic =>
                                    <div className="w-100 ">
                                        <img style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'contain',
                                            overflow: 'hidden'
                                        }} className=" w-100" src={`${pic.img}`} />
                                    </div>

                                )}


                            </div>

                        </Col >
                    </Row>
                </Modal >


            </>

        )
    }




    //  renderAddProductModal
    const renderAddProductModal = (e) => {
        return (



            < Modal
                show={show}
                handleClose={handleClose}
                modalTitle={'ADD NEW PRODUCT'}
                action={CreateProduct}
            >
                <Input
                    name="name"
                    placeholder="Product Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <Input
                    name="quantity"
                    placeholder="Product Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    name="price"
                    placeholder="Product Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    name="description"
                    placeholder="Product Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                {/* cat  */}
                <Form.Select aria-label="Default select example"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option>Select Category</option>
                    {
                        createCategoryList(categoryFrmSt.categories).map((option) =>
                            <option key={option.value} value={option.value}>{option.name}</option>
                        )
                    }

                </Form.Select>



                {/* images */}
                {
                    productPictures.length > 0 ?
                        productPictures.map((pic, index) => <div key={index}> {JSON.stringify(pic.name)}</div>) : null
                }
                <Input
                    placeholder="product Pictures"
                    type="file"
                    // value={productPictures}
                    name="productPictures"
                    onChange={handleProductPictures}
                />
            </Modal >
        )
    }

    return (
        <>
            <Layout sidebar>


                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between mt-4">
                                <h3>Product</h3>
                                <Button variant="primary" onClick={handleShow}>
                                    ADD PRODUCT
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {renderProducts()}
                        </Col>
                    </Row>

                </Container>


                {renderAddProductModal()}
                {renderProductDetailsModal()}



            </Layout>

        </>
    )
}
