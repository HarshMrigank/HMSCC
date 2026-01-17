cmake_minimum_required(VERSION 3.16)

project(HMSCC LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Collect all source files from src/
file(GLOB_RECURSE HMSCC_SOURCES
    ${PROJECT_SOURCE_DIR}/src/*.cpp
)

# Create executable
add_executable(hmscc ${HMSCC_SOURCES})

# Tell compiler where headers live
target_include_directories(hmscc PRIVATE
    ${PROJECT_SOURCE_DIR}/include
)

# Warnings
target_compile_options(hmscc PRIVATE -Wall)
