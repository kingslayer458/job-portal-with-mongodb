document.addEventListener("DOMContentLoaded", () => {
    // Job listings data
    const jobListings = [
      {
        id: 1,
        company: "Amazon",
        logo: "images/amazon-logo.png",
        position: "Full Stack Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 2,
        company: "Tesla",
        logo: "images/tesla-logo.png",
        position: "Node Js Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 3,
        company: "Swiggy",
        logo: "images/swiggy-logo.png",
        position: "UX/UI Designer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 4,
        company: "Amazon",
        logo: "images/amazon-logo.png",
        position: "Full Stack Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 5,
        company: "Tesla",
        logo: "images/tesla-logo.png",
        position: "Node Js Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 6,
        company: "Swiggy",
        logo: "images/swiggy-logo.png",
        position: "UX/UI Designer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 7,
        company: "Amazon",
        logo: "images/amazon-logo.png",
        position: "Full Stack Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
      {
        id: 8,
        company: "Tesla",
        logo: "images/tesla-logo.png",
        position: "Node Js Developer",
        experience: "1-3 yr Exp",
        location: "Onsite",
        salary: "12LPA",
        timeAgo: "24h Ago",
        description: [
          "A user-friendly interface lets you browse stunning photos and videos",
          "Filter destinations based on interests and travel style, and create personalized",
        ],
      },
    ]
  
    // DOM elements
    const jobListingsContainer = document.getElementById("jobListingsContainer")
    const createJobBtn = document.getElementById("createJobBtn")
    const createJobModal = document.getElementById("createJobModal")
    const closeModalBtn = document.getElementById("closeModalBtn")
    const saveDraftBtn = document.getElementById("saveDraftBtn")
    const publishBtn = document.getElementById("publishBtn")
    const locationSelect = document.querySelector(".location-select")
    const locationDropdown = document.querySelector(".location-dropdown")
    const jobTypeSelect = document.querySelector(".job-type-select")
    const jobTypeDropdown = document.querySelector(".job-type-dropdown")
    const minThumb = document.getElementById("minThumb")
    const maxThumb = document.getElementById("maxThumb")
    const rangeSlider = document.getElementById("rangeSlider")
    const salaryRangeText = document.getElementById("salaryRangeText")
  
    // Render job listings
    function renderJobListings() {
      jobListingsContainer.innerHTML = ""
  
      jobListings.forEach((job) => {
        const jobCard = document.createElement("div")
        jobCard.className = "bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
  
        jobCard.innerHTML = `
          <div class="flex items-start justify-between mb-4">
            <div class="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="${job.logo}"
                alt="${job.company} logo"
                class="object-contain"
                width="48"
                height="48"
              />
            </div>
            <span class="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">${job.timeAgo}</span>
          </div>
  
          <h3 class="font-semibold text-lg mb-2">${job.position}</h3>
  
          <div class="flex items-center gap-6 text-sm text-gray-600 mb-4">
            <div class="flex items-center">
              <img src="images/user-icon.png" alt="Experience" class="w-4 h-4 mr-1.5" />
              <span>${job.experience}</span>
            </div>
            <div class="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1.5"
              >
                <path
                  d="M12.5 6.5H3.5C2.94772 6.5 2.5 6.94772 2.5 7.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7.5C13.5 6.94772 13.0523 6.5 12.5 6.5Z"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.5 6.5V4.5C5.5 3.83696 5.76339 3.20107 6.23223 2.73223C6.70107 2.26339 7.33696 2 8 2C8.66304 2 9.29893 2.26339 9.76777 2.73223C10.2366 3.20107 10.5 3.83696 10.5 4.5V6.5"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>${job.location}</span>
            </div>
            <div class="flex items-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mr-1.5"
              >
                <path
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8 5.5V8"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6.5 6.5H9.5"
                  stroke="#6B7280"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>${job.salary}</span>
            </div>
          </div>
  
          <ul class="text-sm text-gray-600 mb-4 space-y-1">
            ${job.description
              .map(
                (desc) => `
              <li class="flex items-start">
                <span class="mr-2">•</span>
                <span class="leading-tight">${desc}</span>
              </li>
            `,
              )
              .join("")}
          </ul>
  
          <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Apply Now</button>
        `
  
        jobListingsContainer.appendChild(jobCard)
      })
    }
  
    // Initialize job listings
    renderJobListings()
  
    // Modal functionality
    createJobBtn.addEventListener("click", () => {
      createJobModal.classList.remove("hidden")
    })
  
    closeModalBtn.addEventListener("click", () => {
      createJobModal.classList.add("hidden")
    })
  
    // Close modal when clicking outside
    createJobModal.addEventListener("click", (e) => {
      if (e.target === createJobModal) {
        createJobModal.classList.add("hidden")
      }
    })
  
    // Dropdown functionality
    locationSelect.addEventListener("click", () => {
      locationDropdown.classList.toggle("hidden")
    })
  
    jobTypeSelect.addEventListener("click", () => {
      jobTypeDropdown.classList.toggle("hidden")
    })
  
    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!locationSelect.contains(e.target)) {
        locationDropdown.classList.add("hidden")
      }
      if (!jobTypeSelect.contains(e.target)) {
        jobTypeDropdown.classList.add("hidden")
      }
    })
  
    // Select dropdown items
    document.querySelectorAll(".location-dropdown div").forEach((item) => {
      item.addEventListener("click", function () {
        locationSelect.querySelector("span").textContent = this.textContent
        locationDropdown.classList.add("hidden")
      })
    })
  
    document.querySelectorAll(".job-type-dropdown div").forEach((item) => {
      item.addEventListener("click", function () {
        jobTypeSelect.querySelector("span").textContent = this.textContent
        jobTypeDropdown.classList.add("hidden")
      })
    })
  
    // Range slider functionality
    let minVal = 50
    let maxVal = 80
    const min = 10
    const max = 100
    let isDragging = null
  
    // Convert to percentage
    function getPercent(value) {
      return ((value - min) / (max - min)) * 100
    }
  
    // Update slider position
    function updateSlider() {
      minThumb.style.left = `calc(${getPercent(minVal)}% - 8px)`
      maxThumb.style.left = `calc(${getPercent(maxVal)}% - 8px)`
      salaryRangeText.textContent = `₹${minVal}k - ₹${maxVal}k`
    }
  
    // Handle mouse down on thumbs
    minThumb.addEventListener("mousedown", (e) => {
      e.preventDefault()
      isDragging = "min"
    })
  
    maxThumb.addEventListener("mousedown", (e) => {
      e.preventDefault()
      isDragging = "max"
    })
  
    // Handle mouse move for dragging
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return
  
      const rect = rangeSlider.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const percent = Math.min(Math.max(0, offsetX / rect.width), 1)
      const newValue = Math.round(percent * (max - min) + min)
  
      if (isDragging === "min" && newValue < maxVal) {
        minVal = newValue
        updateSlider()
      } else if (isDragging === "max" && newValue > minVal) {
        maxVal = newValue
        updateSlider()
      }
    })
  
    // Handle mouse up to stop dragging
    document.addEventListener("mouseup", () => {
      isDragging = null
    })
  
    // Form submission handlers
    saveDraftBtn.addEventListener("click", () => {
      alert("Job draft saved successfully!")
      createJobModal.classList.add("hidden")
    })
  
    publishBtn.addEventListener("click", () => {
      alert("Job published successfully!")
      createJobModal.classList.add("hidden")
    })
  })
  