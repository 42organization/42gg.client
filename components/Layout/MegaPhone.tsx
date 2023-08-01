import { useState, useEffect } from 'react';
import useAxiosGet from 'hooks/useAxiosGet';
import styles from 'styles/Layout/Megaphone.module.scss';

interface MegaphoneContent {
    megaphoneId: number;
    content: string;
    intraId: string;
}

type MegaphoneList = Array<MegaphoneContent>;

const Megaphone = () => {

    const defaultContents: MegaphoneList = [
        {
            megaphoneId: 1,
            content: 'test1',
            intraId: 'hyungjpa',
        },
        {
            megaphoneId: 2,
            content: 'test2',
            intraId: 'hyungjpa2',
        },
        {
            megaphoneId: 3,
            content: 'test3',
            intraId: 'hyungjpa3',
        },
        {
            megaphoneId: 4,
            content: 'test4',
            intraId: 'hyungjpa4',
        },
        {
            megaphoneId: 5,
            content: 'test5',
            intraId: 'hyungjpa5',
        },
    ]
    
    // api 호출해서 내용 받기
    // const getMegaphoneHandler = useAxiosGet({
    //     url: `/pingpong/megaphones`,
    //     setState: setContents,
    //     err: 'HJ01',
    //     type: 'setError'
    // })

    // useEffect(() => {
    //     getMegaphoneHandler();
    // }, []);
    
    const [contents, setContents] = useState<MegaphoneList>(defaultContents);
    const [play, setPlay] = useState('running');
    
    const clickPause = () => {
        if (play === 'pause') {
            setPlay('running');
        } else {
            setPlay('pause');
            setTimeout(() => setPlay('running'), 5000);
        }
    }
    
    const pauseStyle: {[key: string]: string} = {
        pause: styles.pause,
        running: styles.running,
    };

    return (
        <div className={styles.rollingBanner}
        onClick={() => clickPause()}>
            <div className={styles.wrapper}>
                <ul className={`${styles.megaphoneContents} ${pauseStyle[play]}`}>
                    {contents.map((content, idx) => (
                            <li key={idx}>{content.intraId} {content.content} &nbsp;&nbsp;</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Megaphone;