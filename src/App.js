//data

import React, { useState } from "react"
// components
import OnLoader from "./Components/Loader"
import Button from "./Components/Button"
import Container from "./Components/Container"

import ImageGallery from "./Components/ImageGallery"
import Modal from "./Components/Modal"
import Searchbar from "./Components/Searchbar"
import fetchAPI from "./Services/fetchAPI.js"

const App = () => {
    const [images, setImages] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [onError, setOnError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [modalImage, setModalImage] = useState("")

    const onSubmit = (e) => {
        e.preventDefault()

        setIsLoading(true)
        fetchAPI(searchQuery, 1)
            .then((response) => {
                setImages(response.data.hits)
                console.log(images)
                setCurrentPage(1)
            })
            .catch((error) => setOnError(error.message))
            .finally(() => setIsLoading(false))
    }

    const onLoadMore = () => {
        setIsLoading(true)
        fetchAPI(searchQuery, currentPage + 1)
            .then((response) => {
                setImages((prevState) => [...prevState, ...response.data.hits])
                setCurrentPage((prevState) => ++prevState)
            })
            .catch((error) => setOnError(error.message))
            .finally(() => {
                setIsLoading(false)

                window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                })
            })
    }

    const onSetQuery = (e) => {
        setSearchQuery(e.target.value)
    }

    const handleOpenModal = (e) => {
        setModalImage(e.target.dataset.source)
        setShowModal(true)
    }

    const handleCloseModal = (e) => {
        if (e.target.nodeName !== "IMG") {
            setModalImage("")
            setShowModal(false)
        }
    }

    return (
        <Container>
            <Searchbar onSubmit={onSubmit} onSetQuery={onSetQuery} searchQuery={searchQuery} />
            <ImageGallery images={images} handleOpenModal={handleOpenModal} />
            {isLoading && <OnLoader />}
            {showModal && <Modal modalImage={modalImage} handleCloseModal={handleCloseModal} />}

            {images.length > 0 && <Button onLoadMore={onLoadMore} />}
        </Container>
    )
}

export default App
