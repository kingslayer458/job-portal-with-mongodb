"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, Calendar, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// This will be replaced with data from MongoDB
const fallbackJobListings = [
  {
    _id: "1",
    company: "Amazon",
    logo: "/images/amazon-logo.png",
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
    _id: "2",
    company: "Tesla",
    logo: "/images/tesla-logo.png",
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
    _id: "3",
    company: "Swiggy",
    logo: "/images/swiggy-logo.png",
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
    _id: "4",
    company: "Amazon",
    logo: "/images/amazon-logo.png",
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
    _id: "5",
    company: "Tesla",
    logo: "/images/tesla-logo.png",
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
    _id: "6",
    company: "Swiggy",
    logo: "/images/swiggy-logo.png",
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
    _id: "7",
    company: "Amazon",
    logo: "/images/amazon-logo.png",
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
    _id: "8",
    company: "Tesla",
    logo: "/images/tesla-logo.png",
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

// Custom Range Slider Component
const RangeSlider = ({
  min,
  max,
  value,
  onChange,
}: {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100

  const handlePointerDown = (e: React.PointerEvent, thumb: "min" | "max") => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(thumb)
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, x / rect.width))
    const newValue = Math.round(min + percent * (max - min))

    if (isDragging === "min") {
      const newMin = Math.min(newValue, value[1] - 1)
      onChange([newMin, value[1]])
    } else if (isDragging === "max") {
      const newMax = Math.max(newValue, value[0] + 1)
      onChange([value[0], newMax])
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(null)
    ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
  }

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!sliderRef.current || isDragging) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = Math.max(0, Math.min(1, x / rect.width))
    const clickValue = Math.round(min + percent * (max - min))

    const distToMin = Math.abs(clickValue - value[0])
    const distToMax = Math.abs(clickValue - value[1])

    if (distToMin < distToMax && clickValue < value[1]) {
      onChange([clickValue, value[1]])
    } else if (clickValue > value[0]) {
      onChange([value[0], clickValue])
    }
  }

  return (
    <div ref={sliderRef} className="relative h-6 w-full cursor-pointer" onClick={handleTrackClick}>
      <div className="absolute top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-gray-300 rounded-full pointer-events-none"></div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 h-[2px] bg-black rounded-full pointer-events-none"
        style={{
          left: `${getPercent(value[0])}%`,
          width: `${getPercent(value[1]) - getPercent(value[0])}%`,
        }}
      ></div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-grab active:cursor-grabbing"
        style={{ left: `calc(${getPercent(value[0])}% - 8px)` }}
        onPointerDown={(e) => handlePointerDown(e, "min")}
        onPointerMove={isDragging === "min" ? handlePointerMove : undefined}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src="/images/ellipse-slider-thumb.png"
          alt="Min thumb"
          className="w-full h-full pointer-events-none select-none"
          draggable={false}
        />
      </div>
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-grab active:cursor-grabbing"
        style={{ left: `calc(${getPercent(value[1])}% - 8px)` }}
        onPointerDown={(e) => handlePointerDown(e, "max")}
        onPointerMove={isDragging === "max" ? handlePointerMove : undefined}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <img
          src="/images/ellipse-slider-thumb.png"
          alt="Max thumb"
          className="w-full h-full pointer-events-none select-none"
          draggable={false}
        />
      </div>
    </div>
  )
}

export default function JobListingPage() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80])
  const [createJobOpen, setCreateJobOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false)
  const [jobTypeDropdownOpen, setJobTypeDropdownOpen] = useState(false)

  interface JobListing {
    _id: string
    company: string
    logo: string
    position: string
    experience: string
    location: string
    salary: string
    timeAgo: string
    jobType?: string
    description: string[]
  }

  const [jobListings, setJobListings] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  // Form state
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    jobType: "fulltime",
    experience: "1-3 yr Exp",
    salaryMin: "30000",
    salaryMax: "80000",
    deadline: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch job listings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/jobs")

        if (!response.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const data = await response.json()
        setJobListings(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching jobs:", err)
        setError("Failed to load job listings. Using fallback data.")
        setJobListings(fallbackJobListings)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesLocation = !selectedLocation || job.location.toLowerCase() === selectedLocation.toLowerCase()

    const matchesJobType =
      !selectedJobType || (job.jobType && job.jobType.toLowerCase() === selectedJobType.toLowerCase())

    return matchesSearch && matchesLocation && matchesJobType
  })

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  // Handle select changes
  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }))
  }

  // Format currency for display
  const formatCurrency = (amount: string) => {
    const value = Number.parseInt(amount)
    if (isNaN(value)) return ""

    if (value >= 100000) {
      const lakhs = value / 100000
      return lakhs % 1 === 0 ? `₹${lakhs} LPA` : `₹${lakhs.toFixed(1)} LPA`
    }

    return `₹${value.toLocaleString("en-IN")}`
  }

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)

      const salaryDisplay = formData.salaryMin
        ? `${formatCurrency(formData.salaryMin)}-${formatCurrency(formData.salaryMax)}`
        : "Competitive"

      const jobData = {
        company: formData.company,
        logo: "/images/default-logo.png",
        position: formData.position,
        experience: formData.experience,
        location: formData.location,
        jobType: formData.jobType,
        salary: salaryDisplay,
        salaryRange: {
          min: Number.parseInt(formData.salaryMin) || 0,
          max: Number.parseInt(formData.salaryMax) || 0,
        },
        description: formData.description,
        deadline: formData.deadline,
      }

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      })

      if (!response.ok) {
        throw new Error("Failed to create job")
      }

      const newJob = await response.json()

      setJobListings((prev) => [newJob, ...prev])

      setFormData({
        company: "",
        position: "",
        location: "",
        jobType: "fulltime",
        experience: "1-3 yr Exp",
        salaryMin: "50000",
        salaryMax: "100000",
        deadline: "",
        description: "",
      })
      setCreateJobOpen(false)

      toast({
        title: "Success!",
        description: "Job posting created successfully",
      })
    } catch (err) {
      console.error("Error creating job:", err)
      toast({
        title: "Error",
        description: "Failed to create job posting. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen)
    setJobTypeDropdownOpen(false)
  }

  const toggleJobTypeDropdown = () => {
    setJobTypeDropdownOpen(!jobTypeDropdownOpen)
    setLocationDropdownOpen(false)
  }

  const selectLocation = (location: string) => {
    setSelectedLocation(location)
    setLocationDropdownOpen(false)
  }

  const selectJobType = (jobType: string) => {
    setSelectedJobType(jobType)
    setJobTypeDropdownOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".location-dropdown-container") && !target.closest(".job-type-dropdown-container")) {
        setLocationDropdownOpen(false)
        setJobTypeDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div
            className="bg-white flex items-center justify-between mx-auto"
            style={{
              width: "890px",
              height: "80px",
              borderRadius: "122px",
              border: "1px solid #FCFCFC",
              boxShadow: "0px 0px 20px 0px rgba(127, 127, 127, 0.15)",
              paddingLeft: "40px",
              paddingRight: "20px",
            }}
          >
            <div className="flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cmwlogo%20%281%29%201-ov3NmFCQfnYQVOxQS6YKVHab02dSoX.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Find Jobs
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Find Talents
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                About us
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Testimonials
              </a>
            </nav>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 font-medium"
              onClick={() => setCreateJobOpen(true)}
              style={{ height: "48px" }}
            >
              Create Jobs
            </button>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-gray-50 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  placeholder="Search By Job Title, Role"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-200 rounded-md h-12 w-full text-sm"
                />
              </div>
            </div>

            {/* Location Filter */}
            <div className="relative location-dropdown-container">
              <div
                className="border border-gray-200 rounded-md h-12 flex items-center px-3 cursor-pointer"
                onClick={toggleLocationDropdown}
              >
                <svg
                  className="h-5 w-5 mr-3 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span className="text-gray-700 flex-1 text-sm">{selectedLocation || "Preferred Location"}</span>
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {locationDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 z-20 shadow-lg">
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectLocation("Onsite")}
                  >
                    Onsite
                  </div>
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectLocation("Remote")}
                  >
                    Remote
                  </div>
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectLocation("Hybrid")}
                  >
                    Hybrid
                  </div>
                </div>
              )}
            </div>

            {/* Job Type Filter */}
            <div className="relative job-type-dropdown-container">
              <div
                className="border border-gray-200 rounded-md h-12 flex items-center px-3 cursor-pointer"
                onClick={toggleJobTypeDropdown}
              >
                <img src="/images/user-plus-icon.png" alt="Job type icon" className="h-5 w-5 mr-3" />
                <span className="text-gray-700 flex-1 text-sm">{selectedJobType || "Job type"}</span>
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
              {jobTypeDropdownOpen && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md mt-1 z-20 shadow-lg">
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectJobType("fulltime")}
                  >
                    Full Time
                  </div>
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectJobType("parttime")}
                  >
                    Part Time
                  </div>
                  <div
                    className="p-3 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => selectJobType("contract")}
                  >
                    Contract
                  </div>
                </div>
              )}
            </div>

            {/* Salary Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">Salary Per Month</span>
                <span className="font-semibold text-gray-900">
                  ₹{salaryRange[0]}k - ₹{salaryRange[1]}k
                </span>
              </div>
              <div className="px-1 py-2">
                <RangeSlider min={10} max={100} value={salaryRange} onChange={setSalaryRange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings Grid */}
      <div className="container mx-auto px-4 pt-0 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredJobs.map((job) => (
            <div key={job._id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="rounded-full overflow-hidden flex items-center justify-center border"
                  style={{
                    width: "83.46px",
                    height: "82px",
                    borderRadius: "13.18px",
                    borderWidth: "1px",
                    background: "linear-gradient(180deg, #FEFEFD 0%, #F1F1F1 100%)",
                    borderColor: "#FFFFFF",
                    boxShadow: "0px 0px 10.25px 0px rgba(148, 148, 148, 0.25)",
                    padding: "16px",
                  }}
                >
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">{job.timeAgo}</span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{job.position}</h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <img src="/images/user-icon-alt.png" alt="Experience" className="w-4 h-4 mr-1.5" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <img src="/images/briefcase-icon.png" alt="Location" className="w-4 h-4 mr-1.5" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <img src="/images/layers-icon.png" alt="Salary" className="w-4 h-4 mr-1.5" />
                  <span>{job.salary}</span>
                </div>
              </div>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                {job.description.map((desc: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="leading-tight">{desc}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Create Job Dialog */}
      <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
        <DialogContent className="sm:max-w-[848px] sm:max-h-[779px] p-0">
          <div className="p-8">
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-center mb-8">Create Job Opening</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                  Job Title
                </Label>
                <Input
                  id="position"
                  placeholder="Full Stack Developer"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium text-gray-500">
                  Company Name
                </Label>
                <Input
                  id="company"
                  placeholder="Amazon, Microsoft, Swiggy"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="px-4 py-3 border-gray-300 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-500">
                  Location
                </Label>
                <div className="relative">
                  <Input
                    id="location"
                    placeholder="Choose Preferred Location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="px-4 py-3 border-gray-300 rounded-lg pr-10"
                  />
                  <svg
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobType" className="text-sm font-medium text-gray-500">
                  Job Type
                </Label>
                <Select value={formData.jobType} onValueChange={(value) => handleSelectChange(value, "jobType")}>
                  <SelectTrigger id="jobType" className="px-4 py-3 border-gray-300 rounded-lg">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fulltime">FullTime</SelectItem>
                    <SelectItem value="parttime">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-500">Salary Range</Label>
                <div className="flex items-center" style={{ width: "374px", height: "58px", gap: "8px" }}>
                  <div className="relative flex-1">
                    <img
                      src="/images/arrow-icon.png"
                      alt="Arrow"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-auto"
                    />
                    <Input
                      id="salaryMin"
                      className="pl-12 pr-4 py-3 border-gray-300 rounded-lg h-full"
                      placeholder="₹0"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="relative flex-1">
                    <img
                      src="/images/arrow-icon.png"
                      alt="Arrow"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-auto"
                    />
                    <Input
                      id="salaryMax"
                      className="pl-12 pr-4 py-3 border-gray-300 rounded-lg h-full"
                      placeholder="₹12,00,000"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-sm font-medium text-gray-500">
                  Application Deadline
                </Label>
                <div className="relative">
                  <Input
                    id="deadline"
                    type="date"
                    className="px-4 py-3 border-gray-300 rounded-lg pr-10"
                    value={formData.deadline}
                    onChange={handleInputChange}
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-500">
                  Job Description
                </Label>
                <div className="relative">
                  <Textarea
                    id="description"
                    placeholder="Please share a description to let the candidate know more about the job role"
                    className="px-4 py-3 border-gray-300 rounded-lg resize-none"
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                  <svg
                    className="absolute bottom-3 right-3 text-gray-300 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-4 pt-6">
              <button
                type="button"
                className="w-[160px] h-[48px] flex items-center justify-center gap-[10px] rounded-[8px] border-[1.5px] border-[#222222] bg-white pt-[12px] pr-[40px] pb-[12px] pl-[40px] text-gray-700 font-medium shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:bg-gray-50 whitespace-nowrap"
              >
                Save Draft
                <img src="/images/save-draft-icon.png" alt="Save Draft" className="w-[16px] h-[16px]" />
              </button>
              <Button
                className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    Publish
                    <img src="/images/publish-icon.png" alt="Publish" className="w-[16px] h-[16px]" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
