import { app } from '@./app'
import { mui, muiType } from '@./package/material-ui'
import { reactImageCrop, reactImageCropType } from '@./package/react-image-crop'
import React from 'react'
import { ImageCropProps } from './ImageCrop.type.ts'

const ASPECT = 1
const SCALE = 1
const ROTATE = 0

export const ImageCrop = ({ aspect = ASPECT, scale = SCALE, rotate = ROTATE, id, value, variant = 'square', defaultIcon = <mui.icon.Image sx={{ width: '100%', height: '100%' }} />, label, error, helperText, required = true, disabled = false, isSubmitting = false, space = 0, onActionReset, onActionDelete, onActionCropComplete }: ImageCropProps) => {
    const [spaceTop, spaceRight, spaceBottom, spaceLeft] = app.hook.useComponentSpace(space)

    const [crop, setCrop] = React.useState<undefined | reactImageCropType.Crop>(undefined)
    const [imgSrc, setImgSrc] = React.useState<undefined | string>(undefined)
    const [imgCroppedFile, setImgCroppedFile] = React.useState<undefined | string>(undefined)

    const imgRef = React.useRef<HTMLImageElement>(null)

    const sxContent = React.useCallback(
        (theme: muiType.Theme) => ({
            margin: theme.spacing(spaceTop, spaceRight, spaceBottom, spaceLeft),
            padding: theme.spacing(0)
        }),
        [spaceTop, spaceRight, spaceBottom, spaceLeft]
    )
    const sxHead = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: theme.spacing(0),
            padding: theme.spacing(0)
        }),
        []
    )
    const sxHeadLeft = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }),
        []
    )
    const sxHeadRight = React.useCallback(
        () => ({
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-end',
            alignItems: 'center'
        }),
        []
    )
    const sxBody = React.useCallback(
        (theme: muiType.Theme) => ({
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'nowrap',
            alignContent: 'center',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: theme.spacing(0),
            padding: theme.spacing(2, 0)
        }),
        []
    )

    const handleRevokeObjectURL = React.useCallback(() => {
        if (imgCroppedFile) {
            URL.revokeObjectURL(imgCroppedFile)
        }
    }, [imgCroppedFile])

    const handleActionLoadImage = React.useCallback(
        (e: React.SyntheticEvent<HTMLImageElement>) => {
            handleRevokeObjectURL()
            if (e.currentTarget) {
                const { width, height } = e.currentTarget
                setCrop(
                    reactImageCrop.fn.centerCrop(
                        reactImageCrop.fn.makeAspectCrop(
                            {
                                unit: '%',
                                width: 50,
                                height: 50
                            },
                            aspect,
                            width,
                            height
                        ),
                        width,
                        height
                    )
                )
            }
        },
        [aspect, handleRevokeObjectURL]
    )

    const handleActionSelectNewFile = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            handleRevokeObjectURL()
            if (e.target && e.target.files && 0 < e.target.files.length) {
                setCrop(undefined) // Makes crop preview update between images.
                const fileReader = new FileReader()
                fileReader.onloadend = () => setImgSrc(fileReader.result?.toString() || '')
                fileReader.readAsDataURL(e.target.files[0])
            }
        },
        [handleRevokeObjectURL]
    )

    const handleActionReset = React.useCallback(() => {
        handleRevokeObjectURL()
        setCrop(undefined)
        setImgSrc(undefined)
        setImgCroppedFile(undefined)
        onActionReset()
    }, [handleRevokeObjectURL, onActionReset])

    const handleActionDelete = React.useCallback(() => {
        handleRevokeObjectURL()
        setCrop(undefined)
        setImgSrc(undefined)
        setImgCroppedFile(undefined)
        onActionDelete()
    }, [handleRevokeObjectURL, onActionDelete])

    const handleActionCancel = React.useCallback(() => {
        handleRevokeObjectURL()
        setCrop(undefined)
        setImgSrc(undefined)
        setImgCroppedFile(undefined)
    }, [handleRevokeObjectURL])

    const handleActionCropChange = React.useCallback(
        (_: reactImageCropType.PixelCrop, percentCrop: reactImageCropType.PercentCrop) => {
            handleRevokeObjectURL()
            setCrop(percentCrop)
        },
        [handleRevokeObjectURL]
    )

    const handleActionCropComplete = React.useCallback(
        async (pixelCrop: reactImageCropType.PixelCrop) => {
            handleRevokeObjectURL()
            if (imgRef.current) {
                const canvasElement = document.createElement('canvas')
                const canvasElementContext2D = canvasElement.getContext('2d')

                if (canvasElementContext2D) {
                    const scaleX = imgRef.current.naturalWidth / imgRef.current.width
                    const scaleY = imgRef.current.naturalHeight / imgRef.current.height

                    // devicePixelRatio slightly increases sharpness on retina devices at the expense of slightly slower render times and needing to size the image back down if you want to download/upload and be true to the images natural size.
                    // const devicePixelRatio = window.devicePixelRatio
                    const devicePixelRatio = 1

                    canvasElement.width = Math.floor(pixelCrop.width * scaleX * devicePixelRatio)
                    canvasElement.height = Math.floor(pixelCrop.height * scaleY * devicePixelRatio)

                    canvasElementContext2D.scale(devicePixelRatio, devicePixelRatio)
                    canvasElementContext2D.imageSmoothingQuality = 'high'

                    const cropX = pixelCrop.x * scaleX
                    const cropY = pixelCrop.y * scaleY

                    const rotateRads = (rotate * Math.PI) / 180
                    const centerX = imgRef.current.naturalWidth / 2
                    const centerY = imgRef.current.naturalHeight / 2

                    canvasElementContext2D.save()

                    // 5) Move the crop origin to the canvas origin (0,0)
                    canvasElementContext2D.translate(-cropX, -cropY)
                    // 4) Move the origin to the center of the original position
                    canvasElementContext2D.translate(centerX, centerY)
                    // 3) Rotate around the origin
                    canvasElementContext2D.rotate(rotateRads)
                    // 2) Scale the image
                    canvasElementContext2D.scale(scale, scale)
                    // 1) Move the center of the image to the origin (0,0)
                    canvasElementContext2D.translate(-centerX, -centerY)
                    canvasElementContext2D.drawImage(imgRef.current, 0, 0, imgRef.current.naturalWidth, imgRef.current.naturalHeight, 0, 0, imgRef.current.naturalWidth, imgRef.current.naturalHeight)

                    canvasElementContext2D.restore()
                }

                canvasElement.toBlob(
                    (blob) => {
                        if (blob) {
                            const fileReader = new FileReader()
                            fileReader.readAsDataURL(blob)
                            fileReader.onloadend = () => {
                                const stringBase64 = fileReader.result as string
                                onActionCropComplete(stringBase64)
                            }
                            setImgCroppedFile(window.URL.createObjectURL(blob))
                        }
                    },
                    'image/png',
                    1
                )
            }
        },
        [scale, rotate, handleRevokeObjectURL, onActionCropComplete]
    )

    React.useEffect(() => {
        if (isSubmitting && !(crop === undefined && imgSrc === undefined && imgCroppedFile === undefined)) {
            handleActionCancel()
        }
    }, [isSubmitting, crop, imgSrc, imgCroppedFile, handleActionCancel])

    const booleanFieldValue = !!value
    const booleanImgSrc = !!imgSrc

    return (
        <mui.component.Box component={'div'} sx={sxContent}>
            <mui.component.Box component={'div'} sx={sxHead}>
                <mui.component.InputLabel htmlFor={id} sx={sxHeadLeft}>
                    <app.component.button.Button disabled={disabled || booleanImgSrc} variant={'outlined'} space={0}>
                        <mui.icon.AddAPhoto sx={{ m: label ? null : `0 !important` }} />
                        {label}
                        {label && required ? '*' : null}
                    </app.component.button.Button>
                </mui.component.InputLabel>
                <mui.component.Box component={'div'} sx={sxHeadRight}>
                    {booleanImgSrc ? (
                        <>
                            <app.component.button.Button disabled={disabled} variant={'outlined'} space={{ top: 0, right: 1, bottom: 0, left: 0 }} onClick={handleActionReset}>
                                <mui.icon.Restore sx={{ m: `0 !important` }} />
                            </app.component.button.Button>
                            <app.component.button.Button disabled={disabled} variant={'outlined'} space={0} onClick={handleActionCancel}>
                                <mui.icon.Close sx={{ m: `0 !important` }} />
                            </app.component.button.Button>
                        </>
                    ) : (
                        <>
                            <app.component.button.Button disabled={disabled} variant={'outlined'} space={{ top: 0, right: 1, bottom: 0, left: 0 }} onClick={handleActionReset}>
                                <mui.icon.Restore sx={{ m: `0 !important` }} />
                            </app.component.button.Button>
                            <app.component.button.Button disabled={disabled || !booleanFieldValue} variant={'outlined'} space={0} onClick={handleActionDelete}>
                                <mui.icon.DeleteForever sx={{ m: `0 !important` }} />
                            </app.component.button.Button>
                        </>
                    )}
                </mui.component.Box>
            </mui.component.Box>
            {booleanImgSrc ? (
                <>
                    <mui.component.Box component={'div'} sx={sxBody}>
                        <reactImageCrop.component.ReactCrop disabled={disabled} crop={crop} aspect={aspect} locked={false} keepSelection={true} ruleOfThirds={true} onChange={handleActionCropChange} onComplete={handleActionCropComplete}>
                            <img ref={imgRef} src={imgSrc} alt={'Image Crop'} style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }} onLoad={handleActionLoadImage} />
                        </reactImageCrop.component.ReactCrop>
                    </mui.component.Box>
                    <mui.component.FormHelperText error={error}>{helperText}</mui.component.FormHelperText>
                </>
            ) : (
                <>
                    <mui.component.Box component={'div'} sx={sxBody}>
                        <mui.component.TextField id={id} type={'file'} inputProps={{ accept: 'image/png, image/jpg, image/jpeg' }} disabled={disabled} sx={{ display: 'none' }} onChange={handleActionSelectNewFile} />
                        <mui.component.Avatar component={'span'} variant={variant} src={value} sx={{ width: 250, height: 250, opacity: disabled ? 0.5 : 1 }}>
                            {defaultIcon}
                        </mui.component.Avatar>
                    </mui.component.Box>
                    <mui.component.FormHelperText error={error}>{helperText}</mui.component.FormHelperText>
                </>
            )}
        </mui.component.Box>
    )
}
