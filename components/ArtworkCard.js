/*********************************************************************************
*  WEB422 – Assignment 4
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _Shubh Jani Student ID: ____153660212 Date: 3 Nov 2023*
********************************************************************************/ 


import useSWR from "swr"
import Error from "next/error"
import Link from "next/link"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"

const fetcher = (url) => fetch(url).then((res) => res.json())
const placeholder = `https://via.placeholder.com/375x375.png?text=[+Not+Available+]`

export default function ArtworkCard({ objectID }) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  )
  if (error) {
    return <Error statusCode={404} />
  }

  if (!data) {
    return null
  }

  return (
    <Card>
      <Card.Img variant="top" src={data.primaryImageSmall || placeholder} />
      <Card.Body>
        <Card.Title>{data.title || "N/A"}</Card.Title>
        <Card.Text>
          <>
            <strong>Date: </strong>
            {data.objectDate || "N/A"}
            <br />
            <strong>Classification: </strong>
            {data.classification || "N/A"}
            <br />
            <strong>Medium: </strong>
            {data.medium || "N/A"}
            <br />
            <br />
            <Link href={`/artwork/${objectID}`} passHref>
              <Button>
                <strong>ID: </strong>
                {objectID}
              </Button>
            </Link>
          </>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
