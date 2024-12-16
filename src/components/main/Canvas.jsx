import React,{ useRef, useEffect } from 'react';
import Matter from 'matter-js';
import {isBrowser} from 'react-device-detect';
import card_SVG from "@images/wordCard.svg";
import card_SVG_En from "@images/wordCardEn.svg";

function Canvas(){
	const canvasRef = useRef();
    
	useEffect(()=>{
		//기초 설정
		const Engine = Matter.Engine,
					World = Matter.World,
					Bodies = Matter.Bodies,
					Render = Matter.Render,
					Composites = Matter.Composites,
					Composite = Matter.Composite,
					Common = Matter.Common;
		//엔진 생성
		const engine = Engine.create();
		const world = engine.world;
		engine.gravity.y = 1.5;
		const runner = Matter.Runner.create();
		// 이미지 생성
		const image = new Image();
		image.src = card_SVG;
		image.src2 = card_SVG_En;

		//렌더 설정
		const render = Render.create({
			element: canvasRef.current,
			engine: engine,
			options: {
				width: canvasRef.current.clientWidth,
				height: 400,
				isStatic: false,
				wireframes: false, //색까지 칠하기
				background: "white"
				}
			});

		//엔진 구동 및 렌더 진행
		Matter.Runner.run(runner,engine);
		Render.run(render);

		// 벽 생성
		const offset = 10;

		function createWall(x, y, width, height, color) {
			return Bodies.rectangle(x, y, width, height, {
					isStatic: true,
					render: {
							fillStyle: color,
					},
			});
		}

		const topWall = createWall(400, -offset, 800.5 + 2 * offset, 50.5, '#ffffff');
		const bottomWall = createWall(300, 400 + offset, 800.5 + 2 * offset, 50.5, '#ffffff');
		const leftWall = createWall(800 + offset, 300, 50.5, 600.5 + 2 * offset, '#ffffff');
		const rightWall = createWall(-offset, 300, 50.5, 600.5 + 2 * offset, '#ffffff');

		Composite.add(world, [
			topWall,bottomWall,leftWall,rightWall
		]);

	// 이미지 로드된 후에 작동
	image.onload = function() {
		const stack = Composites.stack(20, 20, 10, 2, 0, 0, function(x, y) {
			if (Common.random() > 0.35) {
					return Bodies.rectangle(x, y, 250, 150, {
							render: {
									strokeStyle: '#ffffff',
									sprite: {
											texture: card_SVG,
									}
							}
					});
			} else {
					return Bodies.circle(x, y, 150, {
							density: 0.0005,
							frictionAir: 0.06,
							restitution: 0.3,
							friction: 0.01,
							render: {
									sprite: {
											texture: card_SVG_En,
									}
							}
					});
			}
	});
		Composite.add(world, stack);
	};

	// 브라우저일때만 활성화
	if(isBrowser){
		// 마우스 드래그 기능
		const mouse = Matter.Mouse.create(render.canvas) //마우스 객체 생성
		const mouseConstraint = Matter.MouseConstraint.create(engine,{ //마우스로 화면에서 바디를 클릭, 드래그 할 수 있도록 함
						mouse: mouse,
						constraint: {
								stiffness: 1.2, // 탄성정도
								render:{
										visible: false //마우스 드래그 시 제약조건 보이기X
								}
						}
				})
		World.add(world,mouseConstraint)
		
	}



	return () => {
			Render.stop(render);
			World.clear(world, false);
			Engine.clear(engine);
			render.canvas.remove();
		}; // 컴포넌트가 unmount 될 때 초기화

	},[]);

	return(
			<div className='vb_canvas_wrap' ref={canvasRef}></div>
	);
}
export default Canvas;