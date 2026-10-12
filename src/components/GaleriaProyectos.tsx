"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Proyecto = {
  id: number
  titulo: string
  categoria: string
  imagen: string
}

const CATEGORIAS = ["Todos", "Metálicos", "Acrílicos", "Acero inoxidable", "Bronce", "Cajas de luz", "Vallas", "Gigantografías", "Adhesivos", "Menuderos", "Backings", "Viceras", "Decoración"]

const PROYECTOS: Proyecto[] = [
  { id: 1, titulo: "Rótulo Metálico 20180416 172751", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/20180416_172751.jpg" },
  { id: 2, titulo: "Rótulo Metálico Al Carbón", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Al%20Carb%C3%B3n.jpg" },
  { id: 3, titulo: "Rótulo Metálico Bagueteria", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bagueteria.jpg" },
  { id: 4, titulo: "Rótulo Metálico Barranco", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Barranco.jpg" },
  { id: 5, titulo: "Rótulo Metálico Bookafé 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bookaf%C3%A9%202.jpg" },
  { id: 6, titulo: "Rótulo Metálico Bookafé", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bookaf%C3%A9.jpg" },
  { id: 7, titulo: "Rótulo Metálico Brasa Viva 1", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Brasa%20Viva%201.jpg" },
  { id: 8, titulo: "Rótulo Metálico Brasa Viva 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Brasa%20Viva%202.jpg" },
  { id: 9, titulo: "Rótulo Metálico Bucodent", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Bucodent.jpg" },
  { id: 10, titulo: "Rótulo Metálico Coimpexa", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Coimpexa.jpg" },
  { id: 11, titulo: "Rótulo Metálico Correos del Ecuador 1", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Correos%20del%20Ecuador%201.jpg" },
  { id: 12, titulo: "Rótulo Metálico Correos del Ecuador 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Correos-del-Ecuador-2.jpg" },
  { id: 13, titulo: "Rótulo Metálico Imagen de ChatGPT 29 sept 2026, 07 52 28 p.m.", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Imagen%20de%20ChatGPT%2029%20sept%202026%2C%2007_52_28%20p.m..png" },
  { id: 14, titulo: "Rótulo Metálico IMG 20181121 185739 HHT", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/IMG_20181121_185739_HHT.jpg" },
  { id: 15, titulo: "Rótulo Metálico IMG 20251007 224143", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/IMG_20251007_224143.jpg" },
  { id: 16, titulo: "Rótulo Metálico Impodenim 3", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Impodenim%203.jpg" },
  { id: 17, titulo: "Rótulo Metálico Mr. Dream", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Mr.%20Dream.jpg" },
  { id: 18, titulo: "Rótulo Metálico paluguillo 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/paluguillo%202.jpg" },
  { id: 19, titulo: "Rótulo Metálico Paluguillo", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Paluguillo.jpg" },
  { id: 20, titulo: "Rótulo Metálico Seguro Sucre 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Seguro%20Sucre%202.jpg" },
  { id: 21, titulo: "Rótulo Metálico Seguro Sucre 3", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Seguro%20Sucre%203.jpg" },
  { id: 22, titulo: "Rótulo Metálico Seguros Sucre", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Seguros%20Sucre.jpg" },
  { id: 23, titulo: "Rótulo Metálico Senae 2", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Senae%202.jpg" },
  { id: 24, titulo: "Rótulo Metálico Senae 3", categoria: "Metálicos", imagen: "/Galeria/1%20Metal/Senae%203.jpg" },
  { id: 25, titulo: "Rótulo Acrílico 20180410 125843", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180410_125843.jpg" },
  { id: 26, titulo: "Rótulo Acrílico 20180424 201832", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180424_201832.jpg" },
  { id: 27, titulo: "Rótulo Acrílico 20180429 140215", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180429_140215.jpg" },
  { id: 28, titulo: "Rótulo Acrílico 20180516 152611", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180516_152611.jpg" },
  { id: 29, titulo: "Rótulo Acrílico 20180613 142231(0)", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180613_142231(0).jpg" },
  { id: 30, titulo: "Rótulo Acrílico 20180803 125745", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_125745.jpg" },
  { id: 31, titulo: "Rótulo Acrílico 20180803 173928", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_173928.jpg" },
  { id: 32, titulo: "Rótulo Acrílico 20180803 174252", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_174252.jpg" },
  { id: 33, titulo: "Rótulo Acrílico 20180803 182507", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_182507.jpg" },
  { id: 34, titulo: "Rótulo Acrílico 20180803 182833", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_182833.jpg" },
  { id: 35, titulo: "Rótulo Acrílico 20180803 182854", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_182854.jpg" },
  { id: 36, titulo: "Rótulo Acrílico 20180803 194446", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/20180803_194446.jpg" },
  { id: 37, titulo: "Rótulo Acrílico Bj Bernardo Jiménez", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Bj%20Bernardo%20Jim%C3%A9nez.jpg" },
  { id: 38, titulo: "Rótulo Acrílico Chicberry 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Chicberry%202.jpg" },
  { id: 39, titulo: "Rótulo Acrílico Chicberry 3", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Chicberry%203.jpg" },
  { id: 40, titulo: "Rótulo Acrílico Chicberry", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Chicberry.jpg" },
  { id: 41, titulo: "Rótulo Acrílico Dekorvalles 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Dekorvalles%202.jpg" },
  { id: 42, titulo: "Rótulo Acrílico Dekorvalles 3", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Dekorvalles%203.jpg" },
  { id: 43, titulo: "Rótulo Acrílico Dekorvalles", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Dekorvalles.jpg" },
  { id: 44, titulo: "Rótulo Acrílico El Atajo 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/El%20Atajo%202.jpg" },
  { id: 45, titulo: "Rótulo Acrílico El Atajo 3", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/El%20Atajo%203.jpg" },
  { id: 46, titulo: "Rótulo Acrílico El Atajo", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/El%20Atajo.jpg" },
  { id: 47, titulo: "Rótulo Acrílico Elite 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Elite%202.jpg" },
  { id: 48, titulo: "Rótulo Acrílico Elite", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Elite.jpg" },
  { id: 49, titulo: "Rótulo Acrílico Evolutio", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Evolutio.jpg" },
  { id: 50, titulo: "Rótulo Acrílico Exec 1", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Exec%201.jpg" },
  { id: 51, titulo: "Rótulo Acrílico Exec 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Exec%202.jpg" },
  { id: 52, titulo: "Rótulo Acrílico Farmacias Jin Lenin 7", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Farmacias%20Jin%20Lenin%207.jpg" },
  { id: 53, titulo: "Rótulo Acrílico Farmacias Jin Lenin 8", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Farmacias%20Jin%20Lenin%208.jpg" },
  { id: 54, titulo: "Rótulo Acrílico FMA 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/FMA%202.jpg" },
  { id: 55, titulo: "Rótulo Acrílico FMA 3", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/FMA%203.jpg" },
  { id: 56, titulo: "Rótulo Acrílico FMA", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/FMA.jpg" },
  { id: 57, titulo: "Rótulo Acrílico Good Year", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Good%20Year.jpg" },
  { id: 58, titulo: "Rótulo Acrílico Grupo Health 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Grupo%20Health%202.jpg" },
  { id: 59, titulo: "Rótulo Acrílico Grupo Health", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Grupo%20Health.jpg" },
  { id: 60, titulo: "Rótulo Acrílico Imagen de ChatGPT 29 sept 2026, 08 06 50 p.m.", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Imagen%20de%20ChatGPT%2029%20sept%202026%2C%2008_06_50%20p.m..png" },
  { id: 61, titulo: "Rótulo Acrílico IMG 20251024 182514", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/IMG_20251024_182514.jpg" },
  { id: 62, titulo: "Rótulo Acrílico Innovacerámica 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Innovacer%C3%A1mica%202.jpg" },
  { id: 63, titulo: "Rótulo Acrílico Innovacerámica", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Innovacer%C3%A1mica.jpg" },
  { id: 64, titulo: "Rótulo Acrílico Jinnlenin 1", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Jinnlenin-1.jpg" },
  { id: 65, titulo: "Rótulo Acrílico Jinnlenin 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Jinnlenin-2.jpg" },
  { id: 66, titulo: "Rótulo Acrílico Jinnlenin", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Jinnlenin.jpg" },
  { id: 67, titulo: "Rótulo Acrílico Julian Gaitán 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Julian%20Gait%C3%A1n%202.jpg" },
  { id: 68, titulo: "Rótulo Acrílico Julian Gaitán 3", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Julian%20Gait%C3%A1n%203.jpg" },
  { id: 69, titulo: "Rótulo Acrílico Julian Gaitán 4", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Julian%20Gait%C3%A1n%204.jpg" },
  { id: 70, titulo: "Rótulo Acrílico Julian gaitán 5", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Julian%20gait%C3%A1n%205.jpg" },
  { id: 71, titulo: "Rótulo Acrílico Julian Gaitán", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Julian%20Gait%C3%A1n.jpg" },
  { id: 72, titulo: "Rótulo Acrílico Misska 6 copia", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Misska%206%20-%20copia.jpg" },
  { id: 73, titulo: "Rótulo Acrílico Misska 6", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Misska%206.jpg" },
  { id: 74, titulo: "Rótulo Acrílico Misska", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Misska.jpg" },
  { id: 75, titulo: "Rótulo Acrílico Panificadora Ambato 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Panificadora%20Ambato%202.jpg" },
  { id: 76, titulo: "Rótulo Acrílico Panificadora Ambato 14", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Panificadora%20Ambato%2014.jpg" },
  { id: 77, titulo: "Rótulo Acrílico Panificadora Ambato 15", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Panificadora%20Ambato%2015.jpg" },
  { id: 78, titulo: "Rótulo Acrílico Panificadora Ambato 16", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Panificadora%20Ambato%2016.jpg" },
  { id: 79, titulo: "Rótulo Acrílico Panificadora Ambato", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Panificadora%20Ambato.jpg" },
  { id: 80, titulo: "Rótulo Acrílico Qopos 12", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Qopos%2012.jpg" },
  { id: 81, titulo: "Rótulo Acrílico Qopos 13", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Qopos%2013.jpg" },
  { id: 82, titulo: "Rótulo Acrílico qopos", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/qopos.jpg" },
  { id: 83, titulo: "Rótulo Acrílico Remax", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Remax.jpg" },
  { id: 84, titulo: "Rótulo Acrílico Sesa", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Sesa.jpg" },
  { id: 85, titulo: "Rótulo Acrílico Seyer", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Seyer.JPG" },
  { id: 86, titulo: "Rótulo Acrílico Sol Caribe 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Sol%20Caribe%202.jpg" },
  { id: 87, titulo: "Rótulo Acrílico Sol Caribe", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Sol%20Caribe.jpg" },
  { id: 88, titulo: "Rótulo Acrílico Tc mi canal", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Tc%20mi%20canal.jpg" },
  { id: 89, titulo: "Rótulo Acrílico TH Dep", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/TH%20Dep.jpg" },
  { id: 90, titulo: "Rótulo Acrílico Topazio 5", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Topazio%205.jpg" },
  { id: 91, titulo: "Rótulo Acrílico Tpazio 2", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Tpazio%202.jpg" },
  { id: 92, titulo: "Rótulo Acrílico Tpazio", categoria: "Acrílicos", imagen: "/Galeria/3%20Acr%C3%ADlicos/Tpazio.jpg" },
  { id: 93, titulo: "Rótulo Acero Almenar 2", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Almenar%202.jpg" },
  { id: 94, titulo: "Rótulo Acero Almenar", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Almenar.jpg" },
  { id: 95, titulo: "Rótulo Acero IMG 20190321 153821", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/IMG_20190321_153821.jpg" },
  { id: 96, titulo: "Rótulo Acero Impordenim", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Impordenim.jpg" },
  { id: 97, titulo: "Rótulo Acero La Parrill de Homero", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/La%20Parrill%20de%20Homero.jpg" },
  { id: 98, titulo: "Rótulo Acero Le Blé", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Le%20Bl%C3%A9.jpg" },
  { id: 99, titulo: "Rótulo Acero Misska 4", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Misska%204.jpg" },
  { id: 100, titulo: "Rótulo Acero Misska 8", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Misska%208.jpg" },
  { id: 101, titulo: "Rótulo Acero Misska NNUU", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Misska-NNUU.jpg" },
  { id: 102, titulo: "Rótulo Acero San Andrés", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/San%20Andr%C3%A9s.png" },
  { id: 103, titulo: "Rótulo Acero Uniquedeco", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Uniquedeco.jpg" },
  { id: 104, titulo: "Rótulo Acero Vista Azul 2", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Vista%20Azul%202.jpg" },
  { id: 105, titulo: "Rótulo Acero Vista Azul", categoria: "Acero inoxidable", imagen: "/Galeria/4%20Acero/Vista%20Azul.jpg" },
  { id: 106, titulo: "Rótulo Bronce Bronce", categoria: "Bronce", imagen: "/Galeria/5%20Bronce/Bronce.jpg" },
  { id: 107, titulo: "Rótulo Bronce Impordenim Bronce", categoria: "Bronce", imagen: "/Galeria/5%20Bronce/Impordenim-Bronce.jpg" },
  { id: 108, titulo: "Caja de Luz Dianita", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Dianita.jpg" },
  { id: 109, titulo: "Caja de Luz IMG 20251015 193003", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/IMG_20251015_193003.jpg" },
  { id: 110, titulo: "Caja de Luz IMG 20160613 WA0013", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/IMG-20160613-WA0013.jpg" },
  { id: 111, titulo: "Caja de Luz Lyly Market", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Lyly%20Market.jpg" },
  { id: 112, titulo: "Caja de Luz Mi carmita 2", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Mi%20carmita%202.jpg" },
  { id: 113, titulo: "Caja de Luz Mi Carmita 4", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Mi%20Carmita%204.jpg" },
  { id: 114, titulo: "Caja de Luz Mi Carmita", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Mi%20Carmita.jpg" },
  { id: 115, titulo: "Caja de Luz Misska 2", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Misska%202.jpg" },
  { id: 116, titulo: "Caja de Luz Misska 4", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Misska%204.jpg" },
  { id: 117, titulo: "Caja de Luz Misska 5", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Misska%205.jpg" },
  { id: 118, titulo: "Caja de Luz Seyer Totem", categoria: "Cajas de luz", imagen: "/Galeria/5%20Caja%20de%20luz/Seyer-Totem.jpg" },
  { id: 119, titulo: "Valla Valla 2", categoria: "Vallas", imagen: "/Galeria/6%20Vallas/Valla%202.png" },
  { id: 120, titulo: "Valla Valla", categoria: "Vallas", imagen: "/Galeria/6%20Vallas/Valla.png" },
  { id: 121, titulo: "Gigantografía Misska Portal 3", categoria: "Gigantografías", imagen: "/Galeria/7%20Gigantograf%C3%ADas/Misska%20Portal%203.jpg" },
  { id: 122, titulo: "Gigantografía Misska Portal1", categoria: "Gigantografías", imagen: "/Galeria/7%20Gigantograf%C3%ADas/Misska%20Portal1.jpg" },
  { id: 123, titulo: "Gigantografía Misska Portal 5", categoria: "Gigantografías", imagen: "/Galeria/7%20Gigantograf%C3%ADas/Misska-Portal-5.jpg" },
  { id: 124, titulo: "Adhesivo 20180615 210135", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/20180615_210135.jpg" },
  { id: 125, titulo: "Adhesivo 20180615 210214", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/20180615_210214.jpg" },
  { id: 126, titulo: "Adhesivo 20180802 132406", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/20180802_132406.jpg" },
  { id: 127, titulo: "Adhesivo Adhesico 10", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesico%2010.jpg" },
  { id: 128, titulo: "Adhesivo Adhesivo 13", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesivo%2013.jpg" },
  { id: 129, titulo: "Adhesivo Adhesivos 1", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesivos%201.jpg" },
  { id: 130, titulo: "Adhesivo Adhesivos 2", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesivos%202.jpg" },
  { id: 131, titulo: "Adhesivo Adhesivos", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Adhesivos.jpg" },
  { id: 132, titulo: "Adhesivo Farmacias Jin Lenin 9", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Farmacias%20Jin%20Lenin%209.jpg" },
  { id: 133, titulo: "Adhesivo IMG 20181002 152132 HDR", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/IMG_20181002_152132_HDR.jpg" },
  { id: 134, titulo: "Adhesivo IMG 20181204 183504", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/IMG_20181204_183504.jpg" },
  { id: 135, titulo: "Adhesivo IMG 20181213 132621", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/IMG_20181213_132621.jpg" },
  { id: 136, titulo: "Adhesivo IMG 20250918 093913", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/IMG_20250918_093913.jpg" },
  { id: 137, titulo: "Adhesivo Microperforado 1.1", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Microperforado%201.1.jpg" },
  { id: 138, titulo: "Adhesivo Microperforado 1.2", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Microperforado%201.2.png" },
  { id: 139, titulo: "Adhesivo Microperforado 1", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Microperforado%201.png" },
  { id: 140, titulo: "Adhesivo Qopos 2", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%202.jpg" },
  { id: 141, titulo: "Adhesivo qopos 4", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/qopos%204.jpg" },
  { id: 142, titulo: "Adhesivo Qopos 7", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%207.jpg" },
  { id: 143, titulo: "Adhesivo Qopos 8", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%208.jpg" },
  { id: 144, titulo: "Adhesivo Qopos 9", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%209.jpg" },
  { id: 145, titulo: "Adhesivo Qopos 10", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%2010.jpg" },
  { id: 146, titulo: "Adhesivo Qopos 11", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Qopos%2011.jpg" },
  { id: 147, titulo: "Adhesivo Senae", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/Senae.jpg" },
  { id: 148, titulo: "Adhesivo TC mi canal 2", categoria: "Adhesivos", imagen: "/Galeria/8%20Adhesivos/TC%20mi%20canal%202.jpg" },
  { id: 149, titulo: "Menudero Cuadros Leds", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Cuadros-Leds.jpg" },
  { id: 150, titulo: "Menudero IMG 20181118 151200", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/IMG_20181118_151200.jpg" },
  { id: 151, titulo: "Menudero IMG 20190731 162547", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/IMG_20190731_162547.jpg" },
  { id: 152, titulo: "Menudero Menú cevichería", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Men%C3%BA-cevicher%C3%ADa.jpg" },
  { id: 153, titulo: "Menudero Menudero 3", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Menudero-3.jpg" },
  { id: 154, titulo: "Menudero menudero 4", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/menudero-4.jpg" },
  { id: 155, titulo: "Menudero Menuderos 3", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Menuderos-3.jpg" },
  { id: 156, titulo: "Menudero Menuderos", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Menuderos.jpg" },
  { id: 157, titulo: "Menudero Qopos 3", categoria: "Menuderos", imagen: "/Galeria/10%20Menuderos/Qopos%203.jpg" },
  { id: 158, titulo: "Backing Imagen de ChatGPT 29 sept 2026, 08 28 31 p.m.", categoria: "Backings", imagen: "/Galeria/11%20Backings/Imagen%20de%20ChatGPT%2029%20sept%202026%2C%2008_28_31%20p.m..png" },
  { id: 159, titulo: "Backing Mendoza 1", categoria: "Backings", imagen: "/Galeria/11%20Backings/Mendoza%201.jpg" },
  { id: 160, titulo: "Backing Roll ups", categoria: "Backings", imagen: "/Galeria/11%20Backings/Roll-ups.jpg" },
  { id: 161, titulo: "Backing Samy Stand", categoria: "Backings", imagen: "/Galeria/11%20Backings/Samy-Stand.jpg" },
  { id: 162, titulo: "Vicera IMG 20251016 153440", categoria: "Viceras", imagen: "/Galeria/12%20Viceras/IMG_20251016_153440.jpg" },
  { id: 163, titulo: "Vicera IMG 20251016 153534", categoria: "Viceras", imagen: "/Galeria/12%20Viceras/IMG_20251016_153534.jpg" },
  { id: 164, titulo: "Decoración 20180424 201149", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/20180424_201149.jpg" },
  { id: 165, titulo: "Decoración 20180424 201159", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/20180424_201159.jpg" },
  { id: 166, titulo: "Decoración 20180424 201207", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/20180424_201207.jpg" },
  { id: 167, titulo: "Decoración 20180424 201215", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/20180424_201215.jpg" },
  { id: 168, titulo: "Decoración 20180424 201709", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/20180424_201709.jpg" },
  { id: 169, titulo: "Decoración Qopos 5", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/Qopos%205.jpg" },
  { id: 170, titulo: "Decoración Qopos 6", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/Qopos%206.jpg" },
  { id: 171, titulo: "Decoración Uniquedeco 2", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/Uniquedeco%202.jpg" },
  { id: 172, titulo: "Decoración Uñas Spa DB", categoria: "Decoración", imagen: "/Galeria/13%20Decoraci%C3%B3n/U%C3%B1as-Spa-DB.jpg" },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function GaleriaProyectos() {
  const [activa, setActiva] = useState("Todos")
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  const filtradas = useMemo(() => {
    if (activa === "Todos") return PROYECTOS
    return PROYECTOS.filter((p) => p.categoria === activa)
  }, [activa])

  const openLightbox = (idx: number) => setLightboxIdx(idx)
  const closeLightbox = () => setLightboxIdx(null)

  const prevImage = () => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev - 1 + filtradas.length) % filtradas.length : null
    )
  }

  const nextImage = () => {
    setLightboxIdx((prev) =>
      prev !== null ? (prev + 1) % filtradas.length : null
    )
  }

  return (
    <div className="relative min-h-screen w-full max-w-[100vw] overflow-x-hidden bg-black pt-24 pb-16">
      <div className="absolute top-1/3 left-1/4 size-80 rounded-full bg-red-600/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 size-72 rounded-full bg-red-600/5 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Galería Rótulos 3D
          </h1>
          <p className="mt-3 font-sans text-base text-gray-400">
            Proyectos que hablan por sí solos
          </p>
        </motion.div>

        <motion.div
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiva(cat)}
              className={`rounded-full px-5 py-2 font-sans text-sm font-semibold transition-transform duration-300 ${
                activa === cat
                  ? "bg-[#DC2626] text-white shadow-lg shadow-[#DC2626]/30"
                  : "bg-zinc-800/50 text-gray-400 backdrop-blur-md hover:bg-zinc-700 hover:text-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          key={activa}
        >
          {filtradas.map((proyecto, idx) => (
            <motion.button
              key={proyecto.id}
              type="button"
              onClick={() => openLightbox(idx)}
              variants={cardItem}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-zinc-700 hover:shadow-xl hover:shadow-red-900/10"
            >
              <img
                src={proyecto.imagen}
                alt={proyecto.titulo}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 p-4 transition-transform duration-300 group-hover:bg-black/70">
                <span className="translate-y-4 font-sans text-base font-bold text-white opacity-0 transition-transform duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {proyecto.titulo}
                </span>
                <span className="mt-1 translate-y-4 font-sans text-xs text-gray-400 opacity-0 transition-transform duration-300 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                  {proyecto.categoria}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); closeLightbox() }}
              className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="size-6" />
            </button>

            <motion.button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-transform duration-300 hover:bg-white/20 hover:scale-110"
              aria-label="Anterior"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="size-7" />
            </motion.button>

            <motion.div
              className="relative flex max-h-[85vh] max-w-[90vw] flex-col items-center"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex aspect-[4/3] w-full max-w-4xl items-center justify-center overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-900/50 backdrop-blur-md">
                <img
                  src={filtradas[lightboxIdx].imagen}
                  alt={filtradas[lightboxIdx].titulo}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 font-sans text-lg font-bold text-white">
                {filtradas[lightboxIdx].titulo}
              </p>
              <p className="mt-1 font-sans text-sm text-gray-400">
                {filtradas[lightboxIdx].categoria}
              </p>
              <p className="mt-2 font-sans text-xs text-gray-600">
                {lightboxIdx + 1} / {filtradas.length}
              </p>
            </motion.div>

            <motion.button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 top-1/2 z-10 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-transform duration-300 hover:bg-white/20 hover:scale-110"
              aria-label="Siguiente"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="size-7" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
