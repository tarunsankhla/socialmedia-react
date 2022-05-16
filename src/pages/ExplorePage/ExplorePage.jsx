import Post from 'components/common/Posts/Post';
import { NormalButton } from 'components/UI/Buttons/buttons';
import {firestore} from 'firebase.config';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import "./ExplorePage.css";

const ExplorePage = () => {
    const [allDataArray, setAllDataArray] = useState([]);
    const [backupData, setBackUpData] = useState([]);
    const [fitlertype, setFilterType] = useState("");
    const TrendingQuery = query(collection(firestore, "posts"),where("createdTime","==","1652616892864"))

    useEffect(() => onSnapshot(collection(firestore, "posts"), (doc) => {
        console.log(doc.docs.map(i => {
            return {
                ...(i.data()[i.id]),
                postid: i.id
            }
        }).filter(i => (Object.keys(i).length > 2)));
        setBackUpData(
                () => [...doc.docs.map(i => {
                    return {
                        ...(i.data()[i.id]),
                        postid: i.id
                    }
                }).filter(i => (Object.keys(i).length > 2))]
            )
        setAllDataArray(() => [...doc.docs.map(i => {
            return {
                ...(i.data()[i.id]),
                postid: i.id
            }
        }).filter(i => (Object.keys(i).length > 2))]);
        // if (fitlertype !== "") {
        //     setAllDataArray(() => [...doc.docs.map(i => {
        //         return {
        //             ...(i.data()[i.id]),
        //             postid: i.id
        //         }
        //     }).filter(i => (Object.keys(i).length > 2))]);
        // } else { 
        //     FilterHandler();
        // }
    }), [])


    useEffect(()=>{ 
        FilterHandler();
        
    }, [fitlertype])
    
    const FilterHandler = () => { 
        switch (fitlertype) {
            case "trending":
                console.log("tren");
                setAllDataArray(() => [...backupData.filter(i => (Object.keys(i).length > 2) & (i?.likes?.likeCount >= 2))]);
                break;
            case "latest":
                console.log("late");
                setAllDataArray(() => [...backupData.filter(i => (Object.keys(i).length > 2) & ((i.createdTime / 1000 / 60) > ((new Date().getTime() / 1000 / 60) - 2880)))]);
                break;
            default:
                console.log("default");
                setAllDataArray(() => [...backupData.filter(i => (Object.keys(i).length > 2))])
                break;
        }
    }
    return (
        <div>
            <div className='explore-fitler-tab'>
                <div className='flex'>
                    <NormalButton name="trending" color="#9675b4" class="explore-fitler-btn" click={() =>
                    setFilterType("trending") } />
                    <NormalButton name="latest" color="#9675b4" class="explore-fitler-btn"
                            click={() => setFilterType("latest")} />
                </div>
                <NormalButton class="explore-fitler-btn" color="red"  name="clear" click={() => setFilterType("") }/>
            </div>
            {!!fitlertype.length && <p>Search Result: {allDataArray.length}</p>}
            <div> {
                allDataArray.map(i => (
                    <Post props={i}
                        key={
                            i.postid + i.createdTime
                        }/>

                ))
            } </div>
        </div>
    )
}

export default ExplorePage
