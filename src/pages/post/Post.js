import axios from "axios";
import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userInfo } from "../../data/user";

export const Post = () => {
  const fileInput = useRef(null);
  const [user, setUser] = useRecoilState(userInfo);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);
  const [clickNum, setClickNum] = useState(0);
  const [fileList, setFileList] = useState([]);

  const imgList = new FormData();
  const newPost = new FormData();
  newPost.append("post_id", 0);
  newPost.append("post_owner_id", user["user_id"]);
  newPost.append("image_1", 0);
  newPost.append("image_2", 0);
  newPost.append("image_3", 0);
  newPost.append("state", 0);
  newPost.append("type", 0);

  const isNum = (e) => {
    if (!isNaN(e.target.value)) setCost(e.target.value);
    else {
      alert("숫자를 입력해주세요.");
      e.target.value = "";
    }
  };

  // file이 선택될 때 마다 실행되는 함수
  const handleChange = (e) => {
    const file = e.target.files;
    const fileType = file[0].type.substr(6, 15);

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      setFileList((prev) => [...prev, file[0]]);
      let reader = new FileReader();
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        document.getElementById(`img${clickNum}`).src = reader.result;
      };
    } else {
      alert("png, jpg 파일만 업로드 가능합니다.");
      e.target.value = "";
    }
  };

  // 사진 업로드 버튼 누를 시 파일 선택 화면으로 이동
  const handleButtonClick = (e, num) => {
    fileInput.current.click();
    setClickNum(num);
  };

  // server에 post info 전달
  const submitInfo = async () => {
    let post_id;
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let dateString = year + "-" + month + "-" + day;
    let hours = ("0" + today.getHours()).slice(-2);
    let minutes = ("0" + today.getMinutes()).slice(-2);
    let seconds = ("0" + today.getSeconds()).slice(-2);
    let timeString = hours + ":" + minutes + ":" + seconds;
    newPost.append("title", title);
    newPost.append("description", desc);
    newPost.append("cost", cost);
    newPost.append("writetime", `${dateString} ${timeString}`);
    await axios.post("/post", newPost).then((id) => (post_id = id.data));

    fileList.slice(-3).forEach((file) => imgList.append("multipartFile", file));
    await axios({
      method: "put",
      url: `/s3/file?post_id=${post_id}`,
      data: imgList,
      headers: { "Content-Type": "multipart/form-data" },
    });
    window.location.href = "/";
  };
  return (
    <div>
      <input
        id="fileList"
        type="file"
        multiple={true}
        style={{ display: "none" }}
      />
      <img id="img1" width={300} />
      <img id="img2" width={300} />
      <img id="img3" width={300} />
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="title"
      />
      <button onClick={(e) => handleButtonClick(e, 1)}>사진1</button>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button onClick={(e) => handleButtonClick(e, 2)}>사진2</button>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <button onClick={(e) => handleButtonClick(e, 3)}>사진3</button>
      <input
        type="file"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <textarea
        onChange={(e) => setDesc(e.target.value)}
        placeholder="description"
      />
      <input onChange={isNum} type="text" placeholder="cost" />
      <button onClick={submitInfo}>글 업로드</button>
    </div>
  );
};
