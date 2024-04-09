import React, { useState, useEffect } from 'react';
import DoneIcon from '../../assets/icons/done.svg';
import CancelIcon from '../../assets/icons/cancel.svg';
import { calculateRange, sliceData } from '../../utils/table-pagination';
import '../styles.css';
import useGetProjects from '../../components/hooks/useGetProjects';
import DashboardHeader from '../../components/DashboardHeader';

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function Orders() {
    const { projects, loading } = useGetProjects();
    const [search, setSearch] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setFilteredProjects(projects);
        setPage(1); // Reset page when projects change
    }, [projects]);

  /*  const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearch(searchTerm);
        const searchResults = projects.filter(
            (project) =>
                project.pname.toLowerCase().includes(searchTerm) || project.techused.toLowerCase().includes(searchTerm)
        );
        setFilteredProjects(searchResults);
        setPage(1); // Reset page when search term changes
    };

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };*/
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearch(searchTerm);
        const searchResults = projects.filter((project) =>
            (project.pname && project.pname.toLowerCase().includes(searchTerm)) || 
            (project.techused && project.techused.toLowerCase().includes(searchTerm))
        );
        setFilteredProjects(searchResults);
        setPage(1); // Reset page when search term changes
    };
    

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    if (loading) {
        return (
            <>
            <section class="dots-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>
</section>

            </>
        );
    }

    const itemsPerPage = 5;
    const pagination = calculateRange(filteredProjects, itemsPerPage);

    return (
        <div className="dashboard-content">
            <DashboardHeader />
            <div className="dashboard-content-container">
                <div className="dashboard-content-header">
                    <h2>My Projects</h2>
                    <div className="dashboard-content-search">
                        <input
                            type="text"
                            value={search}
                            placeholder="Search.."
                            className="dashboard-content-input"
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>START-DATE</th>
                            <th>END-DATE</th>
                            <th>STATUS</th>
                            <th>PROJECT-NAME</th>
                            <th>TECHNOLOGIES USED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sliceData(filteredProjects, page, itemsPerPage).map((project, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{formatDate(project.startDate)}</span>
                                </td>
                                <td>
                                    <span>{formatDate(project.endDate)}</span>
                                </td>
                                <td>
                                    <div>
                                        {project.status ? (
                                            <img src={DoneIcon} alt="completed-icon" className="dashboard-content-icon" />
                                        ) : (
                                            <img src={CancelIcon} alt="in-progress-icon" className="dashboard-content-icon" />
                                        )}
                                        <span>{project.status ? 'Completed' : 'In Progress'}</span>
                                    </div>
                                </td>
                                <td>
                                    <span>{project.pname}</span>
                                </td>
                                <td>
                                    <span>{project.techused}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="dashboard-content-footer">
                    {pagination.map((item, index) => (
                        <span
                            key={index}
                            className={item === page ? 'active-pagination' : 'pagination'}
                            onClick={() => handleChangePage(item)}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders;
