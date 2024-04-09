import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/Firebase';

const useGetProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsCollection = collection(db, 'projects');
            const projectsSnapshot = await getDocs(projectsCollection);
            const projectsData = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectsData);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return { projects, loading };
};

export default useGetProjects;
