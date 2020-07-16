const DEBUG_MODE = true;

function log( logMessage ) {
  DEBUG_MODE && console.log( `[sleps LOG] >> ${logMessage}` );
}

DEBUG_MODE && log( 'Включен режим отладки. По ходу работы расширения будут выводиться сообщения отладки' );
