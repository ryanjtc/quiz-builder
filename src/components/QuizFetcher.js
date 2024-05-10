import {useEffect} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const QuizFetcher = ({ setQuizzes, setLoading }) => {
    useEffect(() => {
        (async () => {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'create'));
            const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setQuizzes(quizzesData);
            setLoading(false);
        })();
       // fetchQuizzes();
    }, [setQuizzes, setLoading]);

    return null;
};

export default QuizFetcher;
