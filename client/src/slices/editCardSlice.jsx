import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {};

export const editCardSlice = createSlice({
  name: "editCard",
  initialState,
  reducers: {
    setCard: (state, action) => {
      state.card = action.payload;
    },

    // Change Template
    setTemplateId: (state, action) => {
      state.card.templateId = action.payload;
    },

    // Header Attachments
    profileImg: (state, action) => {
      state.card.profileImg = action.payload;
    },
    backCoverImg: (state, action) => {
      state.card.backCoverImg = action.payload;
    },

    // Contact Information
    logoImg: (state, action) => {
      state.card.logoImg = action.payload;
    },
    firstName: (state, action) => {
      state.card.firstName = action.payload;
    },
    lastName: (state, action) => {
      state.card.lastName = action.payload;
    },
    jobTitle: (state, action) => {
      state.card.jobTitle = action.payload;
    },
    businessName: (state, action) => {
      state.card.businessName = action.payload;
    },
    businessAddress: (state, action) => {
      state.card.businessAddress = action.payload;
    },
    businessDescription: (state, action) => {
      state.card.businessDescription = action.payload;
    },

    // Primary Action
    addPrimaryAction: (state, action) => {
      const { _id, value } = action.payload;
      state.card.primaryActions.push({ _id, value });
    },
    deletePrimaryAction: (state, action) => {
      const { _id } = action.payload;
      state.card.primaryActions = state.card.primaryActions.filter(
        (action) => action._id !== _id
      );
    },
    updatePrimaryAction: (state, action) => {
      const { _id, value } = action.payload;
      const primaryAction = state.card.primaryActions.find(
        (action) => action._id === _id
      );
      if (primaryAction) {
        primaryAction.value = value;
      }
    },

    // Secondary Action
    addSecondaryAction: (state, action) => {
      const { _id, value } = action.payload;
      state.card.secondaryActions.push({ _id, value });
    },
    deleteSecondaryAction: (state, action) => {
      const { _id } = action.payload;
      state.card.secondaryActions = state.card.secondaryActions.filter(
        (action) => action._id !== _id
      );
    },
    updateSecondaryAction: (state, action) => {
      const { _id, value } = action.payload;
      const secondaryAction = state.card.secondaryActions.find(
        (action) => action._id === _id
      );
      if (secondaryAction) {
        secondaryAction.value = value;
      }
    },

    // Feature Content
    addFeatureSection: (state) => {
      const section = {
        _id: nanoid(),
        sectionName: "",
        subSections: [
          {
            _id: nanoid(),
            image: null,
            heading: "",
          },
        ],
      };
      state.card.sections.push(section);
    },
    addFeatureSubSection: (state, action) => {
      const { sectionId } = action.payload;
      const section = state.card.sections.find(
        (section) => section._id === sectionId
      );
      if (section) {
        const subSection = {
          _id: nanoid(),
          image: null,
          heading: "",
        };
        section.subSections.push(subSection);
      }
    },
    updateSectionName: (state, action) => {
      const { sectionId, sectionName } = action.payload;
      const section = state.card.sections.find(
        (section) => section._id === sectionId
      );
      if (section) {
        section.sectionName = sectionName;
      }
    },
    updateSubSection: (state, action) => {
      const { sectionId, subSectionId, image, heading } = action.payload;
      const section = state.card.sections.find(
        (section) => section._id === sectionId
      );
      if (section) {
        const subSection = section.subSections.find(
          (subSection) => subSection._id === subSectionId
        );
        if (subSection) {
          subSection.image = image;
          subSection.heading = heading;
        }
      }
    },
    deleteFeatureSection: (state, action) => {
      const { sectionId } = action.payload;
      state.card.sections = state.card.sections.filter(
        (section) => section._id !== sectionId
      );
    },
    deleteFeatureSubSection: (state, action) => {
      const { sectionId, subSectionId } = action.payload;
      const section = state.card.sections.find(
        (section) => section._id === sectionId
      );
      if (section) {
        section.subSections = section.subSections.filter(
          (subSection) => subSection._id !== subSectionId
        );
      }
    },

    // Color
    reButtonBg: (state, action) => {
      state.card.colors.buttonBg = action.payload;
    },
    reBackground: (state, action) => {
      state.card.colors.background = action.payload;
    },
    reText: (state, action) => {
      state.card.colors.text = action.payload;
    },
    reButtonText: (state, action) => {
      state.card.colors.buttonText = action.payload;
    },
    reCardBg: (state, action) => {
      state.card.colors.cardBg = action.payload;
    },
    reCardText: (state, action) => {
      state.card.colors.cardText = action.payload;
    },
    // reCardSeparator: (state, action) => {
    //   state.card.colors.cardSeparator = action.payload;
    // },
    reCardIcon: (state, action) => {
      state.card.colors.cardIcon = action.payload;
    },
    reFeatureText: (state, action) => {
      state.card.colors.featureText = action.payload;
    },
    reFeatureSeparator: (state, action) => {
      state.card.colors.featureSeparator = action.payload;
    },
    reFooterBg: (state, action) => {
      state.card.colors.footerBg = action.payload;
    },
    reFooterIcon: (state, action) => {
      state.card.colors.footerIcon = action.payload;
    },
    reQrCode: (state, action) => {
      state.card.colors.qrCode = action.payload;
    },
  },
});

export const {
  setCard,
  setTemplateId,
  profileImg,
  backCoverImg,
  logoImg,
  firstName,
  lastName,
  jobTitle,
  businessName,
  businessAddress,
  businessDescription,
  addPrimaryAction,
  deletePrimaryAction,
  updatePrimaryAction,
  addSecondaryAction,
  deleteSecondaryAction,
  updateSecondaryAction,
  addFeatureSection,
  addFeatureSubSection,
  updateSectionName,
  updateSubSection,
  deleteFeatureSection,
  deleteFeatureSubSection,
  reButtonBg,
  reBackground,
  reText,
  reButtonText,
  reCardBg,
  reCardText,
  // reCardSeparator,
  reCardIcon,
  reFeatureText,
  reFeatureSeparator,
  reFooterBg,
  reFooterIcon,
  reQrCode,
} = editCardSlice.actions;

export default editCardSlice.reducer;
