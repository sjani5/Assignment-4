/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _Shubh Jani Student ID: ____153660212 Date: 3 Nov 2023*
********************************************************************************/ 

import useSWR from "swr"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Error from "next/error"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Pagination from "react-bootstrap/Pagination"
import ArtworkCard from "@/components/ArtworkCard"

const PER_PAGE = 12

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null)
  const [page, setPage] = useState(1)

  //Use "useRouter" hook to get the full value of the query string
  const router = useRouter()
  let finalQuery = router.asPath.split("?")[1]

  //Then, we use SWR to make a request to the API, and fetch as json.
  const fetcher = (url) => fetch(url).then((res) => res.json())
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  )

  //The pagination functions using useState
  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  const nextPage = () => {
    if (page < artworkList.length) {
      setPage(page + 1)
    }
  }

  //Use the useEffect hook to synchronize the component.
  useEffect(() => {
    if (data) {
      let results = []
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE)
        results.push(chunk)
      }
      setArtworkList(results)
      setPage(1)
    }
  }, [data])

  //Error handling
  if (error) {
    return <Error statusCode={404} />
  }

  if (!artworkList) {
    return null
  }

  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Text as="div">
                <h4>Nothing Here</h4>
                Try searching for something else.{" "}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>

      {artworkList.length > 0 && (
        <Row>
          <Col>
            {" "}
            <br />
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  )
}
