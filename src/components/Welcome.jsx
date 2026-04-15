import React, { useState } from "react";
import { locations } from "#constants";
import { ChevronLeft, ExternalLink } from "lucide-react";

const projects = locations.work?.children ?? [];

const Welcome = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const getProjectDescription = (project) => {
    const txtFile = project.children?.find((child) => child.fileType === "txt");
    return txtFile?.description || [];
  };

  const getProjectLink = (project) => {
    const urlFile = project.children?.find((child) => child.fileType === "url");
    return urlFile?.href || null;
  };

  const nextImage = () => {
    if (selectedProject?.previewImages) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.previewImages.length,
      );
    }
  };

  return (
    <section id="welcome">
      <div className="small-screen">
        {!selectedProject ? (
          /* Project Grid View */
          <div className="mobile-projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="mobile-project-card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="mobile-project-image">
                  <img src="/images/folder.png" alt={project.name} />
                </div>
                <h3 className="mobile-project-title">{project.name}</h3>
              </div>
            ))}
          </div>
        ) : (
          /* Project Detail View */
          <div className="mobile-project-detail">
            <div className="mobile-detail-header">
              <button onClick={handleBack} className="mobile-back-btn">
                <ChevronLeft size={24} />
              </button>
            </div>

            <div className="mobile-detail-content">
              {/* Project Images Carousel */}
              {selectedProject.previewImages &&
                selectedProject.previewImages.length > 0 && (
                  <div className="mobile-detail-images" onClick={nextImage}>
                    <img
                      src={selectedProject.previewImages[currentImageIndex]}
                      alt={`${selectedProject.name} preview ${currentImageIndex + 1}`}
                    />
                    {selectedProject.previewImages.length > 1 && (
                      <div className="mobile-image-dots">
                        {selectedProject.previewImages.map((_, idx) => (
                          <span
                            key={idx}
                            className={`dot ${idx === currentImageIndex ? "active" : ""}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

              {/* Project Info */}
              <div className="mobile-detail-info">
                {selectedProject.techStack && (
                  <div className="mobile-detail-section">
                    <h3 className="mobile-detail-label">Tech Stack</h3>
                    <p className="mobile-detail-value">
                      {selectedProject.techStack}
                    </p>
                  </div>
                )}

                <div className="mobile-detail-section">
                  <h2 className="mobile-detail-title">
                    {selectedProject.name}
                  </h2>
                  <div className="mobile-detail-description">
                    {getProjectDescription(selectedProject).map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {getProjectLink(selectedProject) && (
                  <a
                    href={getProjectLink(selectedProject)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mobile-detail-link"
                  >
                    <span>View Project</span>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Welcome;
