import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { getImagePath } from "@/lib/utils"

export default function VisionOSPatterns() {
  return (
    <div className="absolute inset-0 bg-[#f3f6fc]">
      <main className="relative min-h-screen p-6 md:p-24">
        <div className="max-w-md mx-auto">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>

          <article>
            <h1 className="text-2xl font-normal text-gray-700 mb-6">Exploring UI Patterns for visionOS</h1>

            <div className="mb-8">
              <Image
                src={getImagePath("/images/vision-os-preview.png")}
                alt="Vision OS UI Preview"
                width={500}
                height={300}
                className="rounded-lg"
              />
            </div>

            <div className="text-gray-500">
              <p className="text-base mb-6 leading-relaxed">
                Ideas for how the gaze-based input method of visionOS could communicate fundamental interactions like
                dragging or entering text.
              </p>

              <h2 className="text-xl font-normal text-gray-600 mt-8 mb-4">The Challenge of Spatial Interfaces</h2>
              <p className="mb-6 leading-relaxed">
                With Apple's visionOS introducing a new paradigm for spatial computing, designers face unique challenges
                in creating intuitive interfaces that respond to gaze, gestures, and voice commands.
              </p>

              <h2 className="text-xl font-normal text-gray-600 mt-8 mb-4">Gaze-Based Input</h2>
              <p className="mb-6 leading-relaxed">
                Unlike traditional pointer-based interfaces, gaze-based input requires rethinking how users interact with
                elements. When a user looks at an object, how do we communicate that it can be manipulated? How do we
                distinguish between "looking at" and "selecting"?
              </p>

              <h2 className="text-xl font-normal text-gray-600 mt-8 mb-4">Proposed Patterns</h2>
              <p className="mb-4 leading-relaxed">Here are some ideas for fundamental interactions:</p>

              <ul className="list-disc pl-5 space-y-3 mb-6">
                <li className="leading-relaxed">
                  <span className="font-medium">Dragging:</span> When a user's gaze fixes on a draggable element, subtle
                  visual cues like a gentle pulsing effect could indicate it can be moved. A pinch gesture could then
                  "grab" the element, allowing it to be repositioned.
                </li>
                <li className="leading-relaxed">
                  <span className="font-medium">Text Entry:</span> For text input, a gaze-activated keyboard could appear
                  when looking at text fields. Dwelling on keys for a short period could trigger selection, or hand
                  gestures could be used for confirmation.
                </li>
                <li className="leading-relaxed">
                  <span className="font-medium">Scrolling:</span> Content containers could respond to vertical hand
                  movements when a user's gaze is fixed on scrollable content, creating a natural "push/pull" metaphor.
                </li>
              </ul>

              <p className="leading-relaxed">
                These patterns aim to create a natural, intuitive experience that leverages the unique capabilities of
                spatial computing while maintaining consistency and learnability.
              </p>
            </div>
          </article>
        </div>
      </main>
    </div>
  )
}

