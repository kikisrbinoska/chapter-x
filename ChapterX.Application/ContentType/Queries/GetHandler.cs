using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.ContentType.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IContentTypeRepository _contentTypeRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IContentTypeRepository contentTypeRepository, ILogger<GetHandler> logger)
        {
            _contentTypeRepository = contentTypeRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var contentType = await _contentTypeRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(contentType);
        }
    }
}
