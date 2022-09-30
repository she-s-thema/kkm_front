import axios from "axios";
import React, { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../data/user";
import styled from "styled-components";

export const Post = () => {
  const fileInput = useRef(null);
  const user = useRecoilValue(userInfo);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cost, setCost] = useState(0);
  const [clickNum, setClickNum] = useState(1);
  const [fileList, setFileList] = useState({
    img1: "",
    img2: "",
    img3: "",
  });
  const [isSelected, setIsSelected] = useState(false);

  const imgList = new FormData();
  const newPost = new FormData();
  newPost.append("post_id", 0);
  newPost.append("post_owner_id", user["user_id"]);
  newPost.append("image_1", "");
  newPost.append("image_2", "");
  newPost.append("image_3", "");
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
    setClickNum(clickNum + 1);
    setIsSelected(true);
    const file = e.target.files;
    const fileType = file[0].type.substr(6, 15);

    if (fileType === "png" || fileType === "jpg" || fileType === "jpeg") {
      if (clickNum === 1) setFileList({ ...fileList, img1: file });
      else if (clickNum === 2) setFileList({ ...fileList, img2: file });
      else if (clickNum === 3) {
        setFileList({ ...fileList, img3: file });
        setClickNum(1);
      }

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
  const handleButtonClick = (e) => {
    fileInput.current.click();
  };

  // server에 post info 전달
  const submitInfo = async () => {
    if (title === "") alert("제목을 설정해주세요.");
    else if (!isSelected) alert("사진이 선택되지 않았습니다.");
    else if (desc === "") alert("상세 설명을 설정해주세요.");
    else if (cost === 0 || cost === "") alert("대여비를 설정해주세요.");
    else {
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

      if (fileList.img1 !== "")
        imgList.append("multipartFile", fileList.img1[0]);
      if (fileList.img2 !== "")
        imgList.append("multipartFile", fileList.img2[0]);
      if (fileList.img3 !== "")
        imgList.append("multipartFile", fileList.img3[0]);

      await axios({
        method: "put",
        url: `/s3/file?post_id=${post_id}`,
        data: imgList,
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("글 작성 완료");
      window.location.href = "/";
    }
  };

  return (
    <LoginBox>
      <Article>
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
        <button onClick={(e) => handleButtonClick(e, 0)}>사진1</button>
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
      </Article>
    </LoginBox>
  );
};

const Article = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 10% 10% 10%;
  background-color: white;
`;

const LoginBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;
