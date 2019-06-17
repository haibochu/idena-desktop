import React, {useState, useEffect} from 'react'
import useLocalStorage from 'react-use/lib/useLocalStorage'
import {FiPlusSquare} from 'react-icons/fi'
import {rem} from 'polished'
import Layout from '../../components/layout'
import {Heading, Box} from '../../shared/components'
import theme from '../../shared/theme'
import FlipToolbar, {
  FlipToolbarItem,
} from '../../screens/flips/shared/components/toolbar'
import FlipList from '../../screens/flips/shared/components/flip-list'
import useFlips from '../../shared/utils/useFlips'
import Flex from '../../shared/components/flex'
import IconLink from '../../shared/components/icon-link'
import FlipCover from '../../screens/flips/shared/components/flip-cover'
import FlipType from '../../screens/flips/shared/types/flip-type'
import {
  NotificationContext,
  NotificationType,
} from '../../shared/providers/notification-provider'

function Flips() {
  const [flipType, setFlipType] = useLocalStorage(
    'flips/filter',
    FlipType.Published
  )
  const {flips, deleteFlip, submitFlip} = useFlips()
  const [filteredFlips, setFilteredFlips] = useState([])

  useEffect(() => {
    setFilteredFlips(flips.filter(flip => flip.type === flipType))
  }, [flipType, flips, setFilteredFlips])

  const {addNotification} = React.useContext(NotificationContext)

  return (
    <Layout>
      <Box px={theme.spacings.xxxlarge} py={theme.spacings.large}>
        <Heading>My Flips</Heading>
        <FlipToolbar>
          <Flex>
            {Object.values(FlipType).map(type => (
              <FlipToolbarItem
                key={type}
                onClick={() => {
                  setFlipType(type)
                }}
                isCurrent={flipType === type}
              >
                {type}
              </FlipToolbarItem>
            ))}
          </Flex>
          <Flex>
            <IconLink href="/flips/new" icon={<FiPlusSquare />}>
              Add flip
            </IconLink>
          </Flex>
        </FlipToolbar>
      </Box>
      <Box my={rem(theme.spacings.medium32)} px={theme.spacings.xxxlarge}>
        <FlipList>
          {filteredFlips.map(flip => (
            <FlipCover
              key={flip.id}
              {...flip}
              onDelete={() => {
                deleteFlip(flip)
              }}
              onPublish={async () => {
                try {
                  const {result, error} = await submitFlip(flip)
                  addNotification({
                    title: error ? 'Error while uploading flip' : 'Flip saved!',
                    body: error ? error.message : `Hash ${result.hash}`,
                    type: error
                      ? NotificationType.Error
                      : NotificationType.Info,
                  })
                } catch ({response: {status}}) {
                  addNotification({
                    title: 'Error while uploading flip',
                    body:
                      status === 413
                        ? 'Maximum image size exceeded'
                        : 'Unexpected error occurred',
                    type: NotificationType.Error,
                  })
                }
              }}
              width="25%"
            />
          ))}
        </FlipList>
      </Box>
    </Layout>
  )
}

export default Flips
