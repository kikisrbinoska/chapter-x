using MediatR;

namespace ChapterX.Application.AISuggestion.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
