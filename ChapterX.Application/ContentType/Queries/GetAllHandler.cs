using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ContentType.Queries
{
    public class GetAllHandler : IRequestHandler<GetAllRequest, GetAllResponse>
    {
        private readonly IContentTypeRepository _contentTypeRepository;
        private readonly ILogger<GetAllHandler> _logger;

        public GetAllHandler(IContentTypeRepository contentTypeRepository, ILogger<GetAllHandler> logger)
        {
            _contentTypeRepository = contentTypeRepository;
            _logger = logger;
        }

        public async Task<GetAllResponse> Handle(GetAllRequest request, CancellationToken cancellationToken)
        {
            var contentTypes = await _contentTypeRepository.GetAllAsync(cancellationToken);
            return new GetAllResponse(contentTypes);
        }
    }
}
