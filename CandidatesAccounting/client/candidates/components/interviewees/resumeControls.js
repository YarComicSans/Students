import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { SELECTORS } from '../../../rootReducer'
import UploadIcon from '@material-ui/icons/FileUpload'
import DownloadIcon from '@material-ui/icons/FileDownload'
import FileUploader from '../../../common/fileUploader'
import FileDownloader from '../../../common/fileDownloader'
import { SmallerIconStyle, SmallButtonStyle } from '../../../common/styleObjects'
import Spinner from '../../../common/UIComponentDecorators/spinner'
import styled from 'styled-components'

function ResumeControls(props) {
  const { interviewee, authorized, disabled, onResumeUploading, uploadResume } = props
  const resumeIsUploaded = interviewee.resume && interviewee.resume.trim() !== ''

  const handleFileUpload = file => {
    uploadResume({ intervieweeId: interviewee.id, resume: file })
  }

  const resumeFileName =
    resumeIsUploaded ?
      <ResumeFileName>{interviewee.resume}</ResumeFileName>
      :
      <ResumeNotLoaded>no resume</ResumeNotLoaded>

  const fileUploader =
    interviewee.id !== onResumeUploading ?
      <FileUploader
        uploadFile={handleFileUpload}
        icon={<UploadIcon style={SmallerIconStyle}/>}
        buttonStyle={SmallButtonStyle}
        disabled={!authorized}
      />
      :
      <Spinner size={24} />

  return (
    <ResumeWrapper>
      { resumeFileName }
      <FileDownloader
        icon={<DownloadIcon style={SmallerIconStyle}/>}
        buttonStyle={SmallButtonStyle}
        disabled={!resumeIsUploaded || disabled}
        downloadLink={window.location.origin + '/interviewees/' + props.interviewee.id + '/resume'}
      />
      { fileUploader }
    </ResumeWrapper>
  )
}

ResumeControls.propTypes = {
  interviewee: PropTypes.object.isRequired,
  authorized: PropTypes.bool.isRequired,
  onResumeUploading: PropTypes.string.isRequired,
  uploadResume: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default connect(state => ({
    authorized: SELECTORS.AUTHORIZATION.AUTHORIZED(state),
    onResumeUploading: SELECTORS.CANDIDATES.ONRESUMEUPLOADING(state)
  }
), actions)(ResumeControls)

const ResumeWrapper = styled.div`
  display: inline-flex;
  content-align: center;
  align-items: center;
`

const ResumeFileName = styled.span`
  color: rgba(0, 0, 0, 0.8);
  margin-right: 4px;
  white-space: nowrap;
`

const ResumeNotLoaded = styled.span`
  padding-left: 4px;
  color: rgba(0, 0, 0, 0.5);
`