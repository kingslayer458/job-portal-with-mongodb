"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, MapPin, Calendar, Save, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"

const jobListings = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
  const [minVal, setMinVal] = useState(value[0])
  const [maxVal, setMaxVal] = useState(value[1])
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null)

  // Convert to percentage
  const getPercent = (value: number) => ((value - min) / (max - min)) * 100

  // Update values when props change
  useEffect(() => {
    setMinVal(value[0])
    setMaxVal(value[1])
  }, [value])

  // Handle mouse down on thumbs
  const handleMouseDown = (e: React.MouseEvent, thumb: "min" | "max") => {
    e.preventDefault()
    setIsDragging(thumb)
  }

  // Handle mouse move for dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      const offsetX = e.clientX - rect.left
      const percent = Math.min(Math.max(0, offsetX / rect.width), 1)
      const newValue = Math.round(percent * (max - min) + min)

      if (isDragging === "min" && newValue < maxVal) {
        setMinVal(newValue)
        onChange([newValue, maxVal])
      } else if (isDragging === "max" && newValue > minVal) {
        setMaxVal(newValue)
        onChange([minVal, newValue])
      }
    }

    const handleMouseUp = () => {
      setIsDragging(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, min, max, minVal, maxVal, onChange])

  return (
    <div className="relative h-6 w-full">
      {/* Track */}
      <div ref={trackRef} className="absolute top-1/2 transform -translate-y-1/2 w-full h-[1px]">
        <img src="/images/slider-track.png" alt="Slider track" className="w-full h-full object-cover" />
      </div>

      {/* Min Thumb */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
        style={{ left: `calc(${getPercent(minVal)}% - 8px)` }}
        onMouseDown={(e) => handleMouseDown(e, "min")}
      >
        <img src="/images/slider-thumb.png" alt="Min thumb" className="w-full h-full" />
      </div>

      {/* Max Thumb */}
      <div
        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 cursor-pointer"
        style={{ left: `calc(${getPercent(maxVal)}% - 8px)` }}
        onMouseDown={(e) => handleMouseDown(e, "max")}
      >
        <img src="/images/slider-thumb.png" alt="Max thumb" className="w-full h-full" />
      </div>
    </div>
  )
}

export default function JobListingPage() {
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50, 80])
  const [createJobOpen, setCreateJobOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 py-6">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-full shadow-sm py-3 px-5">
            <div className="flex items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cmwlogo%20%281%29%201-ov3NmFCQfnYQVOxQS6YKVHab02dSoX.png"
                alt="Logo"
                className="w-10 h-10 object-contain"
              />
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium ml-8">
                Find Jobs
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium ml-8">
                Find Talents
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium ml-8">
                About us
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900 font-medium ml-8">
                Testimonials
              </a>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-2 ml-4"
                onClick={() => setCreateJobOpen(true)}
              >
                Create Jobs
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-gray-50 pb-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative md:w-1/4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search By Job Title, Role"
                  className="pl-10 pr-4 py-2 border-gray-200 rounded-md h-12"
                />
              </div>
            </div>

            <div className="relative md:w-1/4">
              <Select>
                <SelectTrigger className="border-gray-200 h-12">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                    <SelectValue placeholder="Preferred Location" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onsite">Onsite</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="relative md:w-1/4">
              <Select>
                <SelectTrigger className="border-gray-200 h-12">
                  <div className="flex items-center">
                    <img src="/images/user-icon.png" alt="User icon" className="h-5 w-5 mr-2 text-gray-400" />
                    <SelectValue placeholder="Job type" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Full Time</SelectItem>
                  <SelectItem value="parttime">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:w-1/4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Salary Per Month</span>
                <span className="font-medium">
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
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobListings.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
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

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <img src="/images/user-icon.png" alt="Experience" className="w-4 h-4 mr-1.5" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1.5"
                  >
                    <path
                      d="M12.5 6.5H3.5C2.94772 6.5 2.5 6.94772 2.5 7.5V12.5C2.5 13.0523 2.94772 13.5 3.5 13.5H12.5C13.0523 13.5 13.5 13.0523 13.5 12.5V7.5C13.5 6.94772 13.0523 6.5 12.5 6.5Z"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5.5 6.5V4.5C5.5 3.83696 5.76339 3.20107 6.23223 2.73223C6.70107 2.26339 7.33696 2 8 2C8.66304 2 9.29893 2.26339 9.76777 2.73223C10.2366 3.20107 10.5 3.83696 10.5 4.5V6.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1.5"
                  >
                    <path
                      d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 5.5V8"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.5 6.5H9.5"
                      stroke="#6B7280"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{job.salary}</span>
                </div>
              </div>

              <ul className="text-sm text-gray-600 mb-4 space-y-1">
                {job.description.map((desc, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="leading-tight">{desc}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md">Apply Now</Button>
            </div>
          ))}
        </div>
      </div>
      {/* Create Job Dialog */}
      <Dialog open={createJobOpen} onOpenChange={setCreateJobOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">Create Job Opening</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input id="jobTitle" placeholder="Full Stack Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Amazon, Microsoft, Swiggy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="Enter job location" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobType">Job Type</Label>
              <Select defaultValue="fulltime">
                <SelectTrigger id="jobType">
                  <SelectValue placeholder="Select Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="parttime">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="internship">Internship</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Salary Range</Label>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input className="pl-7" placeholder="10,00,000" />
                </div>
                <span>to</span>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input className="pl-7" placeholder="12,00,000" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Application Deadline</Label>
              <div className="relative">
                <Input id="deadline" type="date" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Please share a description to let the candidate know more about the job role"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 flex items-center gap-2">
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
