import React from 'react'
import PropTypes from 'prop-types'
import {margin, rem} from 'polished'
import theme from '../../../shared/theme'
import {Box} from '../../../shared/components'
import {Figure} from '../../../shared/components/utils'

export function NetProfile({address, friendlyStatus, stake, age}) {
  return (
    <Box
      bg={theme.colors.gray}
      p={theme.spacings.xlarge}
      css={{
        borderRadius: '10px',
        ...margin(0, 0, rem(theme.spacings.medium24), 0),
      }}
    >
      <Figure label="Address" value={address} />
      <Figure label="Status" value={friendlyStatus} />
      <Figure label="Stake" value={stake} postfix="DNA" />
      <Figure label="Age" value={age} postfix="epochs" />
    </Box>
  )
}

NetProfile.propTypes = {
  address: PropTypes.string.isRequired,
  age: PropTypes.number,
  friendlyStatus: PropTypes.string,
  stake: PropTypes.string.isRequired,
}

export default NetProfile
