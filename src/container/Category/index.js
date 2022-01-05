import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { CreateCategories } from "../../store/actions";
import Input from '../../components/UI/Input';
import Modal from '../../components/UI/Modal';


export const Category = () => {
    // forms Model to  add
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const dispatch = useDispatch();
    const category = useSelector(state => state.category);


    const CreateCategory = () => {
        const form = new FormData();
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');


        console.log("cat", form)
        dispatch(CreateCategories(form))

    }
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        return myCategories
    }
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

    return (
        <>
            <Layout sidebar >
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="d-flex justify-content-between mt-4">
                                <h3>Category</h3>
                                <Button variant="primary" onClick={handleShow} >
                                    ADD CATEGORY
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            {renderCategories(category.categories)}
                        </Col>
                    </Row>
                </Container>

                <Modal
                    show={show}
                    handleClose={handleClose}
                    modalTitle={'ADD NEW CATEGORY'}
                    action={CreateCategory}
                >
                    <Input
                        // Label="Category Name"
                        name="name"
                        placeholder="Category Name"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Form.Select aria-label="Default select example"
                        name="parentId"
                        onChange={(e) => setParentCategoryId(e.target.value)}
                        value={parentCategoryId}
                    >
                        <option>Select Category</option>
                        {
                            createCategoryList(category.categories).map((option) =>
                                <option key={option.value} value={option.value}>{option.name}</option>
                            )
                        }

                    </Form.Select>

                    <Input
                        // Label="Category"
                        placeholder="Category Image"
                        type="file"
                        // value={categoryImage}
                        name="categoryImage"
                        onChange={(e) => setCategoryImage(e.target.files[0])}
                    />
                </Modal>


            </Layout>

        </>
    )
}
