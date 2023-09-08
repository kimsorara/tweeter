NoSQL database 특징
Collection,Document를 가지고 있다
Collection-폴더이며 Document의 그룹이다
Document-문서와 같다 =>파이어베이스는 필드를 가진다
// useEffect(() => {
// const getDataList = async () => {
// //특정 문서를 가리키는 DocumentReference 생성하기 위해 사용된는 함수로 두개이상의 인자를 받는다
// const listDocRef = addDoc(dbService, "nweets", "list");
// const listDocSnapshot = await getDoc(listDocRef);
// if (listDocSnapshot.exists()) {
// const listData = listDocSnapshot.data();
// console.log(listData);
// // const texts = listData.texts;
// // "createdAt" 필드를 기준으로 최신순으로 정렬
// const sortedTexts = Object.values(listData).sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
// setData(sortedTexts);
// }
// };

// getDataList();
// }, []);

    // const submitHandler = async (e) => {

// e.preventDefault();
// const listDocRef = doc(dbService, "nweets", "list");
// try {
// const newInfoId = uuidv4();
// const newInfo = {
// id: newInfoId,
// text: newText,
// createdAt: new Date().toLocaleString(),
// };
// // 기존 데이터와 새 정보를 병합하여 업데이트
// await setDoc(
// listDocRef,
// {
// ...listDocRef.texts,
// [newInfoId]: newInfo,
// },
// {merge: true}
// );
// setNewText("");
// } catch (error) {
// console.error("문서 업데이트 중 오류 발생: ", error);
// }
// };
