import React, { useState, useEffect } from "react";

const LiveClassComponent = ({ slug, first_name, last_name }) => {
	const [room, setRoom] = useState(slug);
	const [name, setName] = useState(first_name);
	const [call, setCall] = useState(false);
  
	const handleClick = (event) => {
	  event.preventDefault();
	  if (room && name) setCall(true);
	};
  
	const onReady = (event) => {
	  event.target.playVideo();
	};
  
	return (
	  <div>
		{call ? (
		  <div>
			<YouTube
			  videoId={room}
			  onReady={onReady}
			  opts={{
				height: '600',
				width: '100%',
				playerVars: {
				  autoplay: 1,
				},
			  }}
			/>
		  </div>
		) : (
		  <form className="row row-cols-lg-auto g-3 align-items-center">
			<div className="col-12">
			  <input
				id="room"
				type="text"
				placeholder="Room"
				value={room}
				onChange={(e) => setRoom(e.target.value)}
				readOnly={true}
				className="form-control"
			  />
			</div>
			<div className="col-12">
			  <input
				id="name"
				type="text"
				placeholder="Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				readOnly={true}
				className="form-control"
			  />
			</div>
			<div className="col-12">
			  <button
				onClick={handleClick}
				type="submit"
				className="default-btn"
			  >
				<i className="flaticon-user"></i> Start / Join
			  </button>
			</div>
		  </form>
		)}
	  </div>
	);
  };

export default LiveClassComponent;
