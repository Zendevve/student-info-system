onClick = {() => setCurrentPage(p => Math.max(1, p - 1))}
disabled = { currentPage === 1}
              >
  Previous
              </Button >
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-sm font-medium transition-colors",
                        currentPage === pageNum
                          ? "bg-primary-600 text-white"
                          : "text-secondary-600 hover:bg-secondary-100"
                      )}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<ChevronRight size={16} />}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div >
          </div >
        )}
      </Card >
    </div >
  )
}
