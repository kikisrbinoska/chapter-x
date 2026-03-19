using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.AISuggestion.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IAISuggestionRepository _aiSuggestionRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IAISuggestionRepository aiSuggestionRepository, ILogger<GetHandler> logger)
        {
            _aiSuggestionRepository = aiSuggestionRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var suggestion = await _aiSuggestionRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(suggestion);
        }
    }
}
