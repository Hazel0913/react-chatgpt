import Avatar from 'boring-avatars'
import { useEffect, useRef, useState } from 'react'

import { useConfiguration } from '../../hooks/useConfiguration'

export default function Index({ whisperUuid, nowPlayingWhisperUuidState }: any) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { avatarPath, agentName } = useConfiguration()

  useEffect(() => {
    setIsPlaying(whisperUuid && whisperUuid === nowPlayingWhisperUuidState)
  }, [nowPlayingWhisperUuidState, whisperUuid])

  const elemRef = useRef<any>()

  useEffect(() => {
    if (!elemRef || !elemRef.current) return

    if (isPlaying) {
      elemRef.current.play()
    } else {
      elemRef.current.pause()
    }
  }, [isPlaying, elemRef])

  return (
    <>
      {agentName && (
        <div className="relative flex h-12 w-12 flex-col overflow-hidden rounded-full">
          {!avatarPath || avatarPath === 'auto' ? (
            <Avatar size={48} name={agentName} />
          ) : (
            <a href={avatarPath} target="_blank">
              <img src={avatarPath} alt="avatar" className="h-12 w-12 rounded-full bg-[#bfbdbe]" />
            </a>
          )}
        </div>
      )}
    </>
  )
}
