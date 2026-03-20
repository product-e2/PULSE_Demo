import { createContext, useContext, useReducer, useCallback } from 'react'

const DemoContext = createContext(null)

const initialState = {
  currentAct: 1,
  pageType: 'sports',
  widgetVisible: false,
  widgetOpen: false,
  panelVisible: true,
  overlayMinimized: false,
  forcedOutcome: null, // 'win' | 'lose' | 'nearMiss' | null
  adActivated: false,
  pageDetected: false,
  predictions: [],
  currentPrediction: 0,
  predictionsLocked: false,
  streakComplete: false,
  streakFailed: false,
  spinResult: null,
  spinComplete: false,
  bonusRevealed: false,
  emailSubmitted: false,
  showEmbedOverlay: false,
  sessionProfile: {
    sport: null,
    teamAffinity: null,
    casinoEngaged: false,
    segment: null,
  },
  intelligenceLines: [],
  intelligenceKey: 0, // bumped to re-trigger animations
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ACT': {
      const act = action.payload
      const base = {
        ...initialState,
        currentAct: act,
        panelVisible: state.panelVisible,
        overlayMinimized: state.overlayMinimized,
        intelligenceKey: state.intelligenceKey + 1,
      }
      switch (act) {
        case 1:
          return { ...base, pageType: state.pageType, widgetVisible: true, widgetOpen: false }
        case 2:
          return { ...base, pageType: state.pageType, widgetVisible: true, widgetOpen: true }
        case 3:
          return {
            ...base,
            pageType: state.pageType,
            widgetVisible: true,
            widgetOpen: true,
            predictionsLocked: true,
            predictions: [
              { answer: 'Yes', correct: true },
              { answer: 'Over', correct: true },
              { answer: 'Yes', correct: true },
            ],
            currentPrediction: 3,
            streakComplete: true,
          }
        case 4:
          return {
            ...base,
            pageType: state.pageType,
            widgetVisible: true,
            widgetOpen: false,
            adActivated: false,
            pageDetected: false,
          }
        case 5:
          return { ...base, pageType: state.pageType, showEmbedOverlay: true }
        default:
          return base
      }
    }

    case 'SET_PAGE_TYPE':
      return {
        ...state,
        pageType: action.payload,
        adActivated: false,
        pageDetected: false,
        intelligenceKey: state.intelligenceKey + 1,
      }

    case 'ACTIVATE_AD':
      return { ...state, adActivated: true, pageDetected: true }

    case 'FORCE_OUTCOME':
      return { ...state, forcedOutcome: action.payload }

    case 'SUBMIT_PREDICTION': {
      const { answer, correct } = action.payload
      const predictions = [...state.predictions, { answer, correct }]
      const currentPrediction = state.currentPrediction + 1
      const allDone = currentPrediction >= 3
      const allCorrect = allDone && predictions.every((p) => p.correct)
      const anyWrong = predictions.some((p) => !p.correct)
      return {
        ...state,
        predictions,
        currentPrediction,
        streakComplete: allCorrect,
        streakFailed: anyWrong && allDone ? true : state.streakFailed,
        forcedOutcome: null, // consumed
      }
    }

    case 'REVEAL_BONUS':
      return { ...state, bonusRevealed: true }

    case 'SUBMIT_EMAIL':
      return { ...state, emailSubmitted: true }

    case 'TOGGLE_PANEL':
      return { ...state, panelVisible: !state.panelVisible }

    case 'TOGGLE_OVERLAY':
      return { ...state, overlayMinimized: !state.overlayMinimized }

    case 'TOGGLE_WIDGET':
      return { ...state, widgetOpen: !state.widgetOpen }

    case 'APPEND_INTELLIGENCE':
      return {
        ...state,
        intelligenceLines: [...state.intelligenceLines, ...action.payload],
      }

    case 'SET_INTELLIGENCE':
      return {
        ...state,
        intelligenceLines: action.payload,
        intelligenceKey: state.intelligenceKey + 1,
      }

    case 'FAST_FORWARD':
      return {
        ...state,
        predictions: [
          { answer: 'Yes', correct: true },
          { answer: 'Over', correct: true },
          { answer: 'Yes', correct: true },
        ],
        currentPrediction: 3,
        streakComplete: true,
        predictionsLocked: true,
        forcedOutcome: null,
      }

    case 'RESET':
      return { ...initialState, intelligenceKey: state.intelligenceKey + 1 }

    default:
      return state
  }
}

export function DemoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = {
    setAct: useCallback((n) => dispatch({ type: 'SET_ACT', payload: n }), []),
    setPageType: useCallback((t) => dispatch({ type: 'SET_PAGE_TYPE', payload: t }), []),
    forceOutcome: useCallback((o) => dispatch({ type: 'FORCE_OUTCOME', payload: o }), []),
    submitPrediction: useCallback((p) => dispatch({ type: 'SUBMIT_PREDICTION', payload: p }), []),
    revealBonus: useCallback(() => dispatch({ type: 'REVEAL_BONUS' }), []),
    submitEmail: useCallback(() => dispatch({ type: 'SUBMIT_EMAIL' }), []),
    activateAd: useCallback(() => dispatch({ type: 'ACTIVATE_AD' }), []),
    startPredicting: useCallback(() => dispatch({ type: 'SET_ACT', payload: 2 }), []),
    togglePanel: useCallback(() => dispatch({ type: 'TOGGLE_PANEL' }), []),
    toggleOverlay: useCallback(() => dispatch({ type: 'TOGGLE_OVERLAY' }), []),
    toggleWidget: useCallback(() => dispatch({ type: 'TOGGLE_WIDGET' }), []),
    appendIntelligence: useCallback(
      (lines) => dispatch({ type: 'APPEND_INTELLIGENCE', payload: lines }),
      [],
    ),
    setIntelligence: useCallback(
      (lines) => dispatch({ type: 'SET_INTELLIGENCE', payload: lines }),
      [],
    ),
    fastForward: useCallback(() => dispatch({ type: 'FAST_FORWARD' }), []),
    reset: useCallback(() => dispatch({ type: 'RESET' }), []),
  }

  return <DemoContext.Provider value={{ state, ...actions }}>{children}</DemoContext.Provider>
}

export function useDemo() {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}
