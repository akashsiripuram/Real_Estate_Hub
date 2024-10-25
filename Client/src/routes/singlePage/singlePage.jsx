import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { redirect, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
export default function SinglePage() {
  const post = useLoaderData();
  const [saved,setSaved]=useState(post.isSaved);
  const {currentUser}=useContext(AuthContext);
  const handleSave=async()=>{
    setSaved(prev=>!prev);
    if(!currentUser){
      redirect("/login");
    }
    try{
      await apiRequest.post("/users/save",{
        postId:post.id
      });
      
      
      
    }
    catch(error){
      console.error(error);
      setSaved(prev=>!prev);
    }
  }
  return (
    <div className="SinglePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1> {post.title} </h1>
                <div className="address">
                  <img src="/pin.png" alt=""></img>
                  <span>{post.address}</span>
                </div>
                <div className="price">&#8377;{post.price} </div>
              </div>
              <div className="user">
                <img src={post.user.avatar}></img>
                <span> {post.user.username} </span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.petPolicy === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                {post.postDetail.income}
              </div>
            </div>
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.postDetail.bed} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.postDetail.bathroom} bathroom</span>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.postDetail.school}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurent</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{
              backgroundColor:saved ? "#fece51": "white"
            }}>
              <img src="/save.png" />
              {saved?"Place saved":"Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
