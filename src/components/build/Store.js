import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Build } from '../build';
import { createMuiTheme } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/styles';
import { db } from '../../config/firebase';
import { shadowTrue, shadowFalse } from './Shadows';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));

export const Store = (props) => {
	const { themeId, signedInUserId } = useParams();
	const classes = useStyles();

	//General
	const [ color, setColor ] = useState('#3f51b5');
	const [ secondaryColor, setSecondaryColor ] = useState('#f50057');
	const [ defaultColor, setDefaultColor ] = useState('#fafafa');
	const [ paperColor, setPaperColor ] = useState('#fff');
	const [ displayColorPicker, setDisplayColorPicker ] = useState(false);
	const [ displaySecondaryColorPicker, setDisplaySecondaryColorPicker ] = useState(false);
	const [ displayDefaultColorPicker, setDisplayDefaultColorPicker ] = useState(false);
	const [ displayPaperColorPicker, setDisplayPaperColorPicker ] = useState(false);

	//Buttons
	const [ buttonRipple, setButtonRipple ] = useState([ true ]);
	const [ buttonElevation, setButtonElevation ] = useState(true);
	const [ buttonHoverOpacity, setButtonHoverOpacity ] = useState(0.04);
	const [ buttonFontWeight, setButtonFontWeight ] = useState(500);
	const [ buttonFontSize, setButtonFontSize ] = useState(14);
	const [ buttonTextTransform, setButtonTextTransform ] = useState('none');
	const [ buttonHeight, setButtonHeight ] = useState(46);
	const [ buttonPadding, setButtonPadding ] = useState(10);
	const [ buttonBorderRadius, setButtonBorderRadius ] = useState(5);

	//Shadows
	const [ shadow, setShadow ] = useState(shadowFalse);

	//Typography
	const [ fontFamily, setFontFamily ] = useState('Roboto');
	const [ fontSize, setFontSize ] = useState(14);
	const [ primaryTextColor, setPrimaryTextColor ] = useState('#000');
	const [ secondaryTextColor, setSecondaryTextColor ] = useState('#000');
	const [ primaryTextColorPicker, setPrimaryTextColorPicker ] = useState(false);
	const [ secondaryTextColorPicker, setSecondaryTextColorPicker ] = useState(false);

	//Alerts
	const [ errorColor, setErrorColor ] = useState('#f22983');
	const [ warningColor, setWarningColor ] = useState('#ffd034');
	const [ infoColor, setInfoColor ] = useState('#2dbde2');
	const [ successColor, setSuccessColor ] = useState('#5dd24d');

	const [ alertVariant, setAlertVariant ] = useState('');

	const [ errorColorPicker, setErrorColorPicker ] = useState(false);
	const [ warningColorPicker, setWarningColorPicker ] = useState(false);
	const [ infoColorPicker, setInfoColorPicker ] = useState(false);
	const [ successColorPicker, setSuccessColorPicker ] = useState(false);

	//Material-UI states
	const [ expanded, setExpanded ] = useState('panel1');
	const [ tab, setTab ] = useState(0);
	const [ open, setOpen ] = useState(false);

	// Preloaded Saved Theme
	const [ createdAt, setCreatedAt ] = useState(new Date());
	const [ lastEditAt, setLastEditAt ] = useState(new Date());
	const [ userId, setUserId ] = useState('guest');
	const [ themeName, setThemeName ] = useState('Untitled');
	const [ starsCount, setStarsCount ] = useState(0);
	const [ bookmarksCount, setBookmarksCount ] = useState(0);
	const [ explore, setExplore ] = useState(false);
	const [ createdBy, setCreatedBy ] = useState('anonymous');
	const [ isLoading, setLoading ] = useState(true);

	//General Handlers
	const changeColor = (color) => {
		setColor(color.hex);
	};
	const changeSecondaryColor = (secondaryColor) => {
		setSecondaryColor(secondaryColor.hex);
	};
	const changeDefaultColor = (defaultColor) => {
		setDefaultColor(defaultColor.hex);
	};
	const changePaperColor = (paperColor) => {
		setPaperColor(paperColor.hex);
	};

	//Buttons handlers
	const changeButtonRipple = () => {
		setButtonRipple(!buttonRipple ? true : false);
	};
	const changeButtonElevation = () => {
		setButtonElevation(!buttonElevation ? true : false);
	};
	const changeButtonTextTransform = (buttonTextTransform) => {
		setButtonTextTransform(buttonTextTransform);
	};

	//Alerts Handlers
	const changeErrorColor = (errorColor) => {
		setErrorColor(errorColor.hex);
	};
	const changeWarningColor = (warningColor) => {
		setWarningColor(warningColor.hex);
	};
	const changeInfoColor = (infoColor) => {
		setInfoColor(infoColor.hex);
	};
	const changeSuccessColor = (successColor) => {
		setSuccessColor(successColor.hex);
	};

	const changeAlertVariant = (alertVariant) => {
		setAlertVariant(alertVariant);
	};

	//ColorPicker Handlers
	const changeColorPickerDisplayed = (type) => {
		if (type === 'primary') {
			setDisplayColorPicker(!displayColorPicker ? true : false);
		}
		if (type === 'secondary') {
			setDisplaySecondaryColorPicker(!displaySecondaryColorPicker ? true : false);
		}
		if (type === 'default') {
			setDisplayDefaultColorPicker(!displayDefaultColorPicker ? true : false);
		}
		if (type === 'paper') {
			setDisplayPaperColorPicker(!displayPaperColorPicker ? true : false);
		}
		if (type === 'primaryText') {
			setPrimaryTextColorPicker(!primaryTextColorPicker ? true : false);
		}
		if (type === 'secondaryText') {
			setSecondaryTextColorPicker(!secondaryTextColorPicker ? true : false);
		}
		if (type === 'error') {
			setErrorColorPicker(!errorColorPicker ? true : false);
		}
		if (type === 'warning') {
			setWarningColorPicker(!warningColorPicker ? true : false);
		}
		if (type === 'info') {
			setInfoColorPicker(!infoColorPicker ? true : false);
		}
		if (type === 'success') {
			setSuccessColorPicker(!successColorPicker ? true : false);
		}
	};

	//Material-Ui handlers
	const changeExpanded = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const changePrimaryTextColor = (textColor) => {
		setPrimaryTextColor(textColor.hex);
	};
	const changeSecondaryTextColor = (textColor) => {
		setSecondaryTextColor(textColor.hex);
	};
	const changeTab = (event, newTab) => {
		setTab(newTab);
	};

	let downloadTheme = {
		createdAt,
		lastEditAt,
		createdBy,
		userId,
		themeName,
		starsCount,
		bookmarksCount,
		explore,
		shadows: shadow,

		palette: {
			primary: { main: `${color}` },
			secondary: {
				main: `${secondaryColor}`
			},
			text: {
				primary: `${primaryTextColor}`,
				secondary: `${secondaryTextColor}`
			},
			background: {
				paper: `${paperColor}`,
				default: `${defaultColor}`
			},
			error: {
				main: `${errorColor}`
			},
			warning: {
				main: `${warningColor}`
			},
			info: {
				main: `${infoColor}`
			},
			success: {
				main: `${successColor}`
			},
			action: {
				hoverOpacity: `${buttonHoverOpacity}`
			}
		},
		typography: {
			fontFamily: fontFamily,
			fontSize: fontSize,
			button: {
				fontWeight: `${buttonFontWeight}`,
				fontSize: buttonFontSize,
				textTransform: `${buttonTextTransform}`
			}
		},
		props: {
			MuiButtonBase: {
				disableRipple: buttonRipple
			},
			MuiButton: {
				disableElevation: buttonElevation
			},
			MuiAlert: {
				variant: alertVariant
			}
		},
		overrides: {
			MuiButton: {
				root: {
					borderRadius: buttonBorderRadius,
					height: buttonHeight,
					padding: `${buttonPadding}px`
				}
			}
		}
	};

	const setHooks = (themeObject) => {
		setShadow(themeObject.shadows);
		setColor(themeObject.palette.primary.main);
		setSecondaryColor(themeObject.palette.secondary.main);
		setPrimaryTextColor(themeObject.palette.text.primary);
		setSecondaryTextColor(themeObject.palette.text.secondary);
		setDefaultColor(themeObject.palette.background.default);
		setPaperColor(themeObject.palette.background.paper);
		setErrorColor(themeObject.palette.error.main);
		setWarningColor(themeObject.palette.warning.main);
		setInfoColor(themeObject.palette.info.main);
		setSuccessColor(themeObject.palette.success.main);
		setButtonHoverOpacity(themeObject.palette.action.hoverOpacity);
		setFontFamily(themeObject.typography.fontFamily);
		setFontSize(themeObject.typography.fontSize);
		setButtonFontWeight(themeObject.typography.button.fontWeight);
		setButtonFontSize(themeObject.typography.button.fontSize);
		setButtonTextTransform(themeObject.typography.button.textTransform);
		setButtonRipple(themeObject.props.MuiButtonBase.disableRipple);
		setButtonElevation(themeObject.props.MuiButton.disableElevation);
		setAlertVariant(themeObject.props.MuiAlert.variant);
		setButtonBorderRadius(themeObject.overrides.MuiButton.root.borderRadius);
		setButtonHeight(themeObject.overrides.MuiButton.root.height);
		setButtonPadding(themeObject.overrides.MuiButton.root.padding);
		setCreatedAt(themeObject.createdAt);
		setLastEditAt(themeObject.lastEditAt);
		setUserId(themeObject.userId);
		setThemeName(themeObject.themeName);
		setStarsCount(themeObject.starsCount);
		setBookmarksCount(themeObject.bookmarksCount);
		setExplore(themeObject.explore);
		setCreatedBy(themeObject.createdBy);
	};

	useEffect(() => {
		if (themeId) {
			const response = async () => {
				await db
					.collection('CustomizedThemes')
					.doc(`${themeId}`)
					.get()
					.then((doc) => {
						setHooks(doc.data());
						setLoading(false);
					})
					.catch((err) => {
						console.error(err);
					});
			};
			response();
		} else {
			setLoading(false);
		}
	}, []);

	const customTheme = createMuiTheme(downloadTheme);
	return (
		<React.Fragment>
			<Backdrop className={classes.backdrop} open={isLoading}>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Build
				user={props.user}
				themeId={themeId}
				signedInUserId={signedInUserId}
				//General
				color={color}
				setColor={setColor}
				secondaryColor={secondaryColor}
				setSecondaryColor={setSecondaryColor}
				defaultColor={defaultColor}
				setDefaultColor={setDefaultColor}
				paperColor={paperColor}
				setPaperColor={setPaperColor}
				expanded={expanded}
				tab={tab}
				setTab={setTab}
				displayColorPicker={displayColorPicker}
				changeColor={changeColor}
				changeSecondaryColor={changeSecondaryColor}
				changeDefaultColor={changeDefaultColor}
				changePaperColor={changePaperColor}
				changeExpanded={changeExpanded}
				changeTab={changeTab}
				changeColorPickerDisplayed={changeColorPickerDisplayed}
				downloadTheme={downloadTheme}
				displaySecondaryColorPicker={displaySecondaryColorPicker}
				displayDefaultColorPicker={displayDefaultColorPicker}
				displayPaperColorPicker={displayPaperColorPicker}
				downloadTheme={downloadTheme}
				//buttons
				buttonRipple={buttonRipple}
				changeButtonRipple={changeButtonRipple}
				buttonElevation={buttonElevation}
				changeButtonElevation={changeButtonElevation}
				buttonHoverOpacity={buttonHoverOpacity}
				buttonFontWeight={buttonFontWeight}
				buttonFontSize={buttonFontSize}
				buttonTextTransform={buttonTextTransform}
				changeButtonTextTransform={changeButtonTextTransform}
				open={open}
				setOpen={setOpen}
				buttonHeight={buttonHeight}
				buttonPadding={buttonPadding}
				buttonBorderRadius={buttonBorderRadius}
				setButtonHoverOpacity={setButtonHoverOpacity}
				setButtonFontWeight={setButtonFontWeight}
				setButtonFontSize={setButtonFontSize}
				setButtonHeight={setButtonHeight}
				setButtonBorderRadius={setButtonBorderRadius}
				setButtonPadding={setButtonPadding}
				//Shadow
				shadow={shadow}
				setShadow={setShadow}
				shadowTrue={shadowTrue}
				shadowFalse={shadowFalse}
				//Typography
				fontFamily={fontFamily}
				setFontFamily={setFontFamily}
				fontSize={fontSize}
				setFontSize={setFontSize}
				primaryTextColor={primaryTextColor}
				secondaryTextColor={secondaryTextColor}
				primaryTextColorPicker={primaryTextColorPicker}
				secondaryTextColorPicker={secondaryTextColorPicker}
				changePrimaryTextColor={changePrimaryTextColor}
				changeSecondaryTextColor={changeSecondaryTextColor}
				customTheme={customTheme}
				//Alerts
				errorColor={errorColor}
				warningColor={warningColor}
				infoColor={infoColor}
				successColor={successColor}
				errorColorPicker={errorColorPicker}
				warningColorPicker={warningColorPicker}
				infoColorPicker={infoColorPicker}
				successColorPicker={successColorPicker}
				changeErrorColor={changeErrorColor}
				changeWarningColor={changeWarningColor}
				changeInfoColor={changeInfoColor}
				changeSuccessColor={changeSuccessColor}
				alertVariant={alertVariant}
				changeAlertVariant={changeAlertVariant}
			/>
		</React.Fragment>
	);
};
